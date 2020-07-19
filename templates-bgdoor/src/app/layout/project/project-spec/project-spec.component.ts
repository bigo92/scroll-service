import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../_shared/services/post.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-project-spec',
  templateUrl: './project-spec.component.html',
  styleUrls: ['./project-spec.component.scss']
})
export class ProjectSpecComponent implements OnInit {

  public data: any[] = [];
  constructor(
    private ex: ExtensionService,
    private project_sv: PostService
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    let param = {
      categoryId: 2,
      size: 5,
      where: {
        and:[
          {'data.status': '1'}
        ]
      }
    }
    let rs = await this.project_sv.getData(param);
    this.ex.logDebug('get project spec', rs);
    if (rs.success) {      
      this.data = rs.data;      
    }
  }
}
