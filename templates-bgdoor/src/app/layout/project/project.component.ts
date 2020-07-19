import { Component, OnInit } from '@angular/core';
import { PostService } from '../../_shared/services/post.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ActivatedRoute } from '@angular/router';
import { PostCategoryService } from 'src/app/_shared/services/postCategory.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  public paging: any = {
    page: 1,
    size:3,
    order: "Id desc"
  };  

  public data: any[] = [];
  public keyName: any;
  public categoryData: any[] = [];
  public search: any = null;

  constructor(
    private ex: ExtensionService,
    private project_sv: PostService,
    private ar: ActivatedRoute,
    private category_sv: PostCategoryService
  ) { }

  async ngOnInit() {
    await this.getCategoryData();
    this.ar.params.subscribe(async x =>{
      this.keyName = x.keyName !== undefined ? x.keyName : null;
      let search = this.ar.snapshot.queryParams.query;
      this.search = search !== undefined ? search : null;
      this.getData();
    });
  }

  async getCategoryData() {
    let rs = await this.category_sv.FindOne({ id: 2});
    this.ex.logDebug('load category project', rs);
      if(rs.success) {
        let settingDta = rs.data.data.setting;
        let itemGet = settingDta.find(x => x.keyName === 'categoryId');

        if (itemGet !== undefined) {
        this.categoryData = itemGet.dataSource;
      }
    }
  }

  async getData(page: number = 1){
    this.paging.page = page;
    this.paging.categoryId = 2;

    let where = { and: [] }
    //
    switch (this.keyName) {
      case 'noi-bat':
        where.and.push({'data.status': '1'})
        break;
      case null:
        break;
      default:
      let cateData = this.categoryData.find(x => x.keyName === this.keyName);
      if (cateData !== undefined) {
        where.and.push({ 'data.categoryId': cateData.id });
      }
      break;
    }
    if (this.search !== null) {
      let keyName = this.ex.BoDau(this.search);
      where.and.push({ 'data.keyName': {like: keyName} });
    }
    if (where.and.length > 0) {
      this.paging.where = where;
    }

    let rs = await this.project_sv.getData(this.paging);
    this.ex.logDebug('getData', rs);
      if (rs.success) {
        this.data = rs.data;
        this.paging = rs.paging;
      }

    }

  }

