import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../_shared/services/global-data.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  public data: any[] = [];
  constructor(
    private golobalData_Sv: GlobalDataService
  ) { }

  async ngOnInit() {
    this.data = await this.golobalData_Sv.getCategory();
  }
}
