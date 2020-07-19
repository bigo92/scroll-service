import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalDataService } from '../../_shared/services/global-data.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

declare var $;
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public dataSale: any[] = [];
  public dataNew: any[] = [];
  public quickViewData: any;
  public keyName: any;
  public data: any[] = [];
  public paging: any = {
    size: 9
  };
  public order: any = "Id desc";
  public layout: any = 1;
  public wPrice: any = null;
  constructor(
    private ex: ExtensionService,
    private product_sv: ProductService,
    private golobalData_sv: GlobalDataService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ar.params.subscribe(x => {
      this.keyName = x.keyName !== undefined ? x.keyName : null;
      this.getData();
    });
    this.getDataNew();
    this.getDataSale();
  }

  async getData(page: number = 1) {
    this.paging.page = page;
    this.paging.order = this.order;
    this.paging.categoryId = 1;
    let where = { and: [] };
    //where
    switch (this.keyName) {
      case 'noi-bat':
        where.and.push({ 'data.status': '1' });
        break;
      case 'moi':
        this.paging.order = "Id desc";
        break;
      case 'khuyen-mai':
        where.and.push({ 'data.price': { neqn: null } });
        break;
      case null: break;
      default:
        let categoryData = (await this.golobalData_sv.getCategory()).find(x => x.keyName === this.keyName);
        if (categoryData !== undefined) {
          where.and.push({ 'data.categoryId': categoryData.id });
        }
        break;
    }
    if (this.wPrice !== null) {
      switch (this.wPrice) {
        case '1':
          where.and.push({ 'data.price': { lte: 100000 } });
          break;
        case '2':
          where.and.push({ 'data.price': { lte: 200000 } });
          where.and.push({ 'data.price': { gte: 100000 } });
          break;
        case '3':
          where.and.push({ 'data.price': { lte: 300000 } });
          where.and.push({ 'data.price': { gte: 200000 } });
          break;
        case '4':
          where.and.push({ 'data.price': { lte: 500000 } });
          where.and.push({ 'data.price': { gte: 300000 } });
          break;
        case '5':
          where.and.push({ 'data.price': { lte: 1000000 } });
          where.and.push({ 'data.price': { gte: 500000 } });
          break;
        case '6':
          where.and.push({ 'data.price': { gte: 1000000 } });
          break;
        default:
          break;
      }
    }
    if (where.and.length > 0) {
      this.paging.where = where;
    }
    this.ex.logDebug('params where', this.paging);
    let rs = await this.product_sv.getData(this.paging);
    this.ex.logDebug('get lst product', rs);
    if (rs.success) {
      this.data = rs.data;
      this.paging = rs.paging;
    }
  }

  async getDataNew() {
    let rs = await this.product_sv.getData({
      categoryId: 1,
      size: 1
    });
    this.ex.logDebug('get Data new', rs);
    if (rs.success && rs.data.length > 0) {
      this.dataNew = rs.data;
    }
  }

  async getDataSale() {
    let rs = await this.product_sv.getData({
      categoryId: 1,
      size: 1,
      where: {
        and: [
          { 'data.price': { neqn: null } }
        ]
      }
    });
    this.ex.logDebug('get Data sale', rs);
    if (rs.success && rs.data.length > 0) {
      this.dataSale = rs.data;
    }
  }

  quickView(data: any) {
    this.quickViewData = data;
    $('#quick-view-product').fadeIn(300);
  }

  filterPrice(e: any) {
    let element = e.currentTarget;
    let check = $(element).is(":checked");
    if (check) {
      $('.filter-item--check-box').find('input').prop('checked', false);
      $(element).prop('checked', true);
      let value = $(element).val();
      this.wPrice = value;
      this.getData();
    } else {
      this.wPrice = null;
      this.getData();
    }
  }
}
