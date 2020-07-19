import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../../_shared/services/photo.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-s6',
  templateUrl: './s6.component.html',
  styleUrls: ['./s6.component.scss']
})
export class S6Component implements OnInit {

  public data: any[] = [];
  constructor(
    private ex: ExtensionService,
    private general_sv: PhotoService
  ) { }

  ngOnInit() {
    this.getData();
  }

  async getData() {
    let rs = await this.general_sv.getData({
      categoryId: 5
    });
    this.ex.logDebug('get logoData', rs);
    if (rs.success) {
      this.data = rs.data;
    }
  }
}
