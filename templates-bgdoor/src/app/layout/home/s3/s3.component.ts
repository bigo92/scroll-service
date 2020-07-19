import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../_shared/services/product.service';
import { GlobalDataService } from '../../../_shared/services/global-data.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

declare var $;
@Component({
  selector: 'app-s3',
  templateUrl: './s3.component.html',
  styleUrls: ['./s3.component.scss']
})
export class S3Component implements OnInit {

  public quickViewData: any;
  public data: any[] = [];
  constructor(
    private ex: ExtensionService,
    private product_sv: ProductService,
    private globalData_Sv: GlobalDataService
  ) { }

  async ngOnInit() {
    let tempData = await this.globalData_Sv.getCategory();
    let task: any[] = [];
    for (let index = 0; index < tempData.length; index++) {
      const x = tempData[index];
      x.product = [];
      let param = {
        categoryId: 1,
        size: 4,
        where: {
          and: [{
            'data.categoryId': x.id
          }]
        }
      }
      
      let rs = await this.product_sv.getData(param);
      if (rs.success) {
        x.product = rs.data;
      }   
    }    
    this.data = tempData;
  }

  quickView(data: any) {
    this.quickViewData = data;
    $('#quick-view-product').fadeIn(300);
  }
}
