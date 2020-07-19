import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../_shared/services/post.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-news-special',
  templateUrl: './news-special.component.html',
  styleUrls: ['./news-special.component.scss']
})
export class NewsSpecialComponent implements OnInit {

  public data: any[] = [];

  constructor(
    private ex: ExtensionService,
    private news_sv: PostService
  ) { }

  ngOnInit() {
    this.getData()
  }

  async getData() {
    let param = {
      categoryID: 1,
      size: 3,
      where : {
        and : [
          {'data.status': '1'}
        ]
      }
    }
    let rs = await this.news_sv.getData(param);
    this.ex.logDebug('get news special', rs);
    if(rs.success){
      this.data = rs.data;
    }
  }
}
