import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../_shared/services/setting.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-s4',
  templateUrl: './s4.component.html',
  styleUrls: ['./s4.component.scss']
})
export class S4Component implements OnInit {

  public data: any;
  constructor(
    private ex: ExtensionService,
    private setting_sv: SettingService
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    let param = {
      size: 1,
      categoryId: 3,      
    }
    let rs = await this.setting_sv.getData(param);
    this.ex.logDebug('load banner Data', rs);
    if (rs.success && rs.data.length > 0) {
      this.data = rs.data[0];      
    }
  }

}
