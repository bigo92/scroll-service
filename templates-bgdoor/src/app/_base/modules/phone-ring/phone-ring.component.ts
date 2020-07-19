import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../_shared/services/global-data.service';

@Component({
  selector: 'app-phone-ring',
  templateUrl: './phone-ring.component.html',
  styleUrls: ['./phone-ring.component.scss']
})
export class PhoneRingComponent implements OnInit {

  public settingData: any = { data: { phone: '' } };
  constructor(
    private globalData_sv: GlobalDataService
  ) { }

  async ngOnInit() {
    this.settingData = await this.globalData_sv.getSetingData();    
  }

}
