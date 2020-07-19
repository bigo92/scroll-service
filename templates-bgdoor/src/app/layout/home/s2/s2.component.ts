import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../_shared/services/global-data.service';

@Component({
  selector: 'app-s2',
  templateUrl: './s2.component.html',
  styleUrls: ['./s2.component.scss']
})
export class S2Component implements OnInit {

  public categoryData: any[] = [];
  constructor(
    private globalData_sv: GlobalDataService
  ) { }

  async ngOnInit() {
    this.categoryData = await this.globalData_sv.getCategory();    
  }

}
