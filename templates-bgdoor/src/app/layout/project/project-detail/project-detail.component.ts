import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../_shared/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  public data: any;
  public id: any;
  constructor(
    private ex: ExtensionService,
    private project_sv: PostService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ar.params.subscribe(x=>{
      this.id = x.id !== undefined? x.id : null;
      this.getData();    
    });   
  }

  async getData(){
    let rs = await this.project_sv.FindOne({id: this.id});
    this.ex.logDebug('FindOne', rs);
    if (rs.success) {
      this.data = rs.data;
    }
  }

}
