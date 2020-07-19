import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PhotoService } from '../../../_shared/services/photo.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

declare var $;
@Component({
  selector: 'app-s1',
  templateUrl: './s1.component.html',
  styleUrls: ['./s1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class S1Component implements OnInit {

  public data: any[] = [];
  constructor(
    private ex: ExtensionService,
    private general_sv: PhotoService
  ) { }

  async ngOnInit() {
    await this.getData();
    this.initSlide();
  }

  async getData() {
    let rs = await this.general_sv.getData({
      order: 'Id asc',
      categoryId: 3
    });
    this.ex.logDebug('get s1Data', rs);
    if (rs.success) {
      this.data = rs.data;
    }
  }

  initSlide() {
    setTimeout(() => {
      $('#home-silde').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dom: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
            nav: false,
            dots: false,
          },
          768: {
            items: 1,
            nav: false,
            dots: false,
          },
          1024: {
            items: 1,
            nav: true,
            dots: false,
          },
        }
      });
    }, 100);
  }
}
