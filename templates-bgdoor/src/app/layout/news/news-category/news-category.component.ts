import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../../../_base/services/extension.service';
import { PostCategoryService } from '../../../_shared/services/postCategory.service';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.scss']
})
export class NewsCategoryComponent implements OnInit {
  public data: any[] = [];

  constructor(
    private ex: ExtensionService,
    private category_sv: PostCategoryService
  ) { }

  ngOnInit() {
    this.getCategory();
  }
  async getCategory() {
    let rs = await this.category_sv.FindOne({ id: 1 });
    this.ex.logDebug('load category news', rs);
    if (rs.success) {
      let settingDta = rs.data.data.setting;
      let itemGet = settingDta.find(x => x.keyName === 'categoryId');
      if (itemGet !== undefined) {
        this.data = itemGet.dataSource;
        this.ex.logDebug('lst ctegory', this.data);
      }
    }
  }

}
