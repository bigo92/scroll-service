import { Component, OnInit } from '@angular/core';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { PostService } from 'src/app/_shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalDataService } from '../../_shared/services/global-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public data: any;
  public id: any;
  public url: any = '';
  constructor(
    private ex: ExtensionService,
    private about_sv: PostService,
    private ar: ActivatedRoute,
    private globalData_sv: GlobalDataService
   ) { }

  async ngOnInit() {
    this.id = this.ar.snapshot.params.id;
    this.getData();      
    this.getBannerTop();
  }

  async getBannerTop() {
    let settingData = await this.globalData_sv.getSetingData();
    if (settingData !== null) {
      let urlData = settingData.files.find(x=>x.flag === 'bannerTop');
      if (urlData !== undefined) {
        this.url = urlData.url;
      }
    }
  }

  async getData(){
    let rs = await this.about_sv.FindOne({id:11});
    this.ex.logDebug('FindOne', rs);
    if (rs.success) {
      this.data = rs.data;      
    }
  }

}
