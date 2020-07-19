import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GlobalDataService } from '../../services/global-data.service';
import { GioHangService } from '../../services/gio-hang.service';
import { PhotoService } from '../../services/photo.service';
import { ExtensionService } from '../../../_base/services/extension.service';
import { ProductCategoryService } from '../../services/productCategory.service';

declare var $;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public settingData: any;
  public openMenu: boolean = false;
  public giohang: any[] = [];
  public showroomData: any[] = [];
  public listCategory: any[] = [];
  constructor(
    public rt: Router,
    private ex: ExtensionService,
    private global_sv: GlobalDataService,
    private general_sv: PhotoService,
    public gh: GioHangService,
    private prod_sv: ProductCategoryService
  ) { }

  async ngOnInit() {
    this.gh.get().subscribe(x => {
      this.giohang = x;
    })
    this.settingData = await this.global_sv.getSetingData();
    this.initJavascript();
    this.rt.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        this.checkMenu();
      }
    });
    await this.checkMenu();
    await this.getShowroomData();
    await this.getCategory();
  }

  async getShowroomData() {
    let params = {
      categoryId: 4
    };
    let rs = await this.general_sv.getData(params);
    this.ex.logDebug('getShowroomData', rs);
    if (rs.success) {
      this.showroomData = rs.data;
    }
  }

  async getCategory() {
    let rs = await this.prod_sv.getData({page:1, size:12});
    if (rs.success) {
      this.listCategory = rs.data[0].data.setting[2].dataSource
    }
  }

  checkMenu() {
    if (location.pathname === '/') {
      $('#menu-website').removeClass('menuNotInHome');
    } else {
      $('#menu-website').addClass('menuNotInHome');
    }
  }

  initJavascript() {
    let outside = this;
    setTimeout(() => {
      $('.btn-click').click(function () {
        if ($('.btn-click').hasClass('fa-search')) {
          $('.btn-click').removeClass('fa-search');
          $('.btn-click').addClass('fa-times');
          $('.input-group').addClass('show');

        } else {
          $('.btn-click').addClass('fa-search');
          $('.btn-click').removeClass('fa-times');
          $('.input-group').removeClass('show');
        }
      });
      $(document).on('click', '#lst-menu-item', function () {
        outside.togleMenu();
      })
    }, 100);
  }

  getImage(name: any) {
    let data = this.settingData.files.find(x => x.flag === name);
    return data !== undefined ? data.url : '';
  }

  togleMenu() {
    this.openMenu = !this.openMenu;
    if (this.openMenu) {
      $('html').addClass("mm-opened mm-background mm-effect-slide mm-pageshadow mm-opening")
    } else {
      $('html').removeClass("mm-opened mm-background mm-effect-slide mm-pageshadow mm-opening")
    }
  }
}
