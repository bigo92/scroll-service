import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../_shared/services/global-data.service';

@Component({
  selector: 'app-project-category',
  templateUrl: './project-category.component.html',
  styleUrls: ['./project-category.component.scss']
})
export class ProjectCategoryComponent implements OnInit {

  constructor(
    private golobalData_Sv: GlobalDataService
  ) { }

  ngOnInit() {
  }

}
