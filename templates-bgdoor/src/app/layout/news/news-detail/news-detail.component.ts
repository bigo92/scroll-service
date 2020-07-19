import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../_shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { GlobalDataService } from '../../../_shared/services/global-data.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  public data: any;
  public id: any;
  public url: string = '';
  public link: string = '';
  constructor(
    private ex: ExtensionService,
    private news_sv: PostService,
    private ar: ActivatedRoute,
    private globalData_sv: GlobalDataService
  ) { }

  ngOnInit() {
    // this.id = this.ar.snapshot.params.id;
    // this.getData();    
    this.ar.params.subscribe(z=> { 
      this.id = z.id !== undefined ? z.id : null;
      this.getData();
      this.getBannerTop();
    });
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
    let rs = await this.news_sv.FindOne({id: this.id});
    this.ex.logDebug('FindOne', rs);
    if (rs.success) {
      this.data = rs.data;
      this.link = `http://bgdoor.vn/tin-tuc/${this.data.data.keyTitle}/${this.data.id}`
    }
  }

}
