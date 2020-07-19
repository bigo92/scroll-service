import { Component, OnInit, ViewEncapsulation, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Config } from '../../../_shared/modules/_config/config';

declare var $;
@Component({
  selector: 'img-server',
  templateUrl: './img-server.component.html',
  styleUrls: ['./img-server.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImgServerComponent implements OnInit, AfterViewInit {

  @Input('src') src: any;
  @Input('alt') alt: any;
  @Input('class') class: any;
  public isLoad: boolean = false;
  public srcloading: any;
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.srcloading = `${Config.url}/api/file/dowload?url=${this.src}&w=${10}&h=${10}`;
  }

  ngAfterViewInit() {
    let outside = this;
    setTimeout(() => {
      let img = outside.el.nativeElement;
      let w = $(img).width();
      let h = $(img).height();

      this.src = `${Config.url}/api/file/dowload?url=${outside.src}&w=${w}&h=${h}`;
      $(outside.el.nativeElement).removeClass(outside.class);
      outside.isLoad = true;
    }, 0);
  }
}
