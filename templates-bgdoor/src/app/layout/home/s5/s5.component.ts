import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../_shared/services/post.service';
import { PhotoService } from '../../../_shared/services/photo.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { GlobalDataService } from '../../../_shared/services/global-data.service';

declare var $;
@Component({
  selector: 'app-s5',
  templateUrl: './s5.component.html',
  styleUrls: ['./s5.component.scss']
})
export class S5Component implements OnInit {

  public url: any = '';
  public blogData: any[] = [];
  public commentData: any[] = [];  
  constructor(
    private ex: ExtensionService,
    private post_sv: PostService,
    private general_sv: PhotoService,
    private globalData_sv: GlobalDataService
  ) { }

  async ngOnInit() {
    this.getBlog().then(x=>{
      this.initSlideBlog();
    });
    this.getComment().then(x=>{
      this.initSlideComment();
    });
    let settingData = await this.globalData_sv.getSetingData();
    if (settingData !== null) {
      let urlData = settingData.files.find(x=>x.flag === 'imageBackground');
      if (urlData !== undefined) {
        this.url = urlData.url;
      }
    }  
  }

  async getBlog() {
    let rs = await this.post_sv.getData({
      categoryId: 1,
      size: 10
    });
    this.ex.logDebug('get slide bog', rs);
    if (rs.success) {
      this.blogData = rs.data;
    }
  }

  async getComment() {
    let rs = await this.general_sv.getData({
      categoryId: 6,
      size: 10
    });
    this.ex.logDebug('get slide bog', rs);
    if (rs.success) {
      this.commentData = rs.data;
    }
  }

  initSlideBlog() {
    setTimeout(() => {
      setTimeout(() => {
        $('#post-slide').owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          dom: false,
          autoplay: false,
          autoplayTimeout: 2500,
          responsive: {
            0: {
              items: 1,
              nav: true,
              dots: false,
            }
          }
        })
      }, 100);
    }, 100);
  }

  initSlideComment() {
    setTimeout(() => {
      $('#comment-slide').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dom: false,
        autoplay: true,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
            nav: false,
            dots: false,
          }
        }
      })
    }, 100);
  }

}
