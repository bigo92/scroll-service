import { Component, OnInit } from '@angular/core';
import { PostService } from '../../_shared/services/post.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { GlobalDataService } from '../../_shared/services/global-data.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { PostCategoryService } from '../../_shared/services/postCategory.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  public url: string = '';
  public paging: any = {
    page: 1,
    size: 3,
    order: "Id desc"
  };
  public keyName: any;
  public categoryData: any[]=[];
  public data: any[] = [];
  constructor(
    private ex: ExtensionService,
    private news_sv: PostService,
    private globalData_sv: GlobalDataService,
    private category_sv: PostCategoryService,
    private ar: ActivatedRoute,

  ) { }

  async  ngOnInit() {
    
    this.getBannerTop();
    await this.getCategoryData();
    this.ar.params.subscribe(async x =>{
      this.keyName= x .keyName !==undefined ? x.keyName: null;
      this.getData();
    });
  }
  async getCategoryData(){
    let rs = await this.category_sv.FindOne({ id: 1 });
    this.ex.logDebug('load category news', rs);
    if (rs.success) {
      let settingDta = rs.data.data.setting;
      let itemGet = settingDta.find(x => x.keyName === 'categoryId');
      if (itemGet !== undefined) {
        this.categoryData = itemGet.dataSource;
      }
    }
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

  async getData(page: number = 1) {
    this.paging.page = page;
    this.paging.categoryId = 1;
    let where = { and: [] };
    switch(this.keyName){
      case 'noi-bat':
       where.and.push({ 'data.status': '1' });
       this.ex.logDebug('load category news',this.keyName)
        break;
      case null:
        break;
      default:
      let catedata= this.categoryData.find(x=> x.keyName===this.keyName);
      if(catedata !==undefined){
        where.and.push({'data.categoryId':catedata.id});
      }
      break;
    }
    if (where.and.length > 0) {
      this.paging.where = where;
    }
   
    let rs = await this.news_sv.getData(this.paging);
    this.ex.logDebug('getData', rs);
    if (rs.success) {
      this.data = rs.data;
      this.paging = rs.paging;
    }
  }
}
