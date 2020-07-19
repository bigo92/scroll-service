import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { ProductService } from 'src/app/_shared/services/product.service';
import { GioHangService } from 'src/app/_shared/services/gio-hang.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

declare var $;
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  public location = location;
  public quickViewData: any;
  public id: any;
  public data: any;
  public dataOther: any[] = [];
  public tab: any = 1;
  public mask = createNumberMask({
    prefix: '',
    allowNegative: false,
    allowDecimal: false,
    thousandsSeparatorSymbol: ""
  });  
  public lstImg: any[] = [];
  public curentImg: any;
  constructor(
    private ex: ExtensionService,
    private product_sv: ProductService,
    public gh: GioHangService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ar.params.subscribe(async x => {
      this.id = x.id !== undefined ? x.id : null;
      this.getData().then(x => {
        this.onInitJs();
        this.initSlideItem();
      });
      this.getDataOther().then(x => this.initSlideOther());
    });
  }

  async getData() {
    $('#lst-image-for-detail').trigger("destroy.owl.carousel");
    let rs = await this.product_sv.FindOne({ id: this.id });
    this.ex.logDebug('load detail product', rs);
    if (rs.success) {
      rs.data.data.size = rs.data.data.size.split(',');
      rs.data.data.color = rs.data.data.color.split(',');
      this.data = rs.data;
      this.lstImg = rs.data.files.filter(x=>x.url !== '');
      if (this.lstImg.length > 0) {
        this.curentImg = this.lstImg[0].url;
      }
    }
  }

  async getDataOther() {
    $('#slide-product-orther').trigger("destroy.owl.carousel");
    let param = {
      categoryId: 1,
      size: 8,
      where: {
        and: [
          { id: { neq: this.id } }
        ]
      }
    };
    let rs = await this.product_sv.getData(param);
    this.ex.logDebug('load data other', rs);
    if (rs.success) {
      this.dataOther = rs.data;
    }    
  }

  initSlideItem() {
    setTimeout(() => {
      $('#lst-image-for-detail').owlCarousel({
        loop: false,
        margin: 15,
        nav: false,
        dom: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
            nav: true,
            dots: false,
          },
          768: {
            items: 3,
            nav: true,
            dots: false,
          },
          1024: {
            items: 4,
            nav: true,
            dots: false,
          }
        }
      })
    }, 100);
  }

  initSlideOther() {
    setTimeout(() => {
      $('#slide-product-orther').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dom: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
          0: {
            items: 1,
            nav: true,
            dots: false,
          },
          768: {
            items: 2,
            nav: true,
            dots: false,
          },
          1024: {
            items: 3,
            nav: true,
            dots: false,
          }
        }
      })
    }, 100);
  }

  onInitJs() {
    setTimeout(() => {
      if ($(window).width() >= 992) {
        $(document).ready(function () {
          var imgWight = $('#zoom_01').attr("width");
          var imgHeight = $('#zoom_01').attr("height");
          $('#zoom_01').elevateZoom({
            gallery: 'lst-image-for-detail',
            zoomWindowWidth: imgWight,
            zoomWindowHeight: imgHeight,
            zoomWindowOffetx: 10,
            easing: true,
            scrollZoom: true,
            cursor: 'pointer',
            galleryActiveClass: 'active',
            imageCrossfade: true
          });
        });
      }
      if ($(window).width() >= 992) {
        $('#lst-image-for-detail img, .swatch-element label').click(function (e) {
          $('.checkurl').attr('href', $(this).attr('src'));
          setTimeout(function () {
            var imgWight = $('#zoom_01').attr("width");
            var imgHeight = $('#zoom_01').attr("height");
            $('.zoomContainer').remove();
            $('#zoom_01').elevateZoom({
              gallery: 'lst-image-for-detail',
              zoomWindowWidth: imgWight,
              zoomWindowHeight: imgHeight,
              zoomWindowOffetx: 10,
              easing: true,
              scrollZoom: true,
              cursor: 'pointer',
              galleryActiveClass: 'active',
              imageCrossfade: true
            });
          }, 300);
        })
      }
      else {
        $(document).on('click', '#lst-image-for-detail .item a', function () { if ($(this).attr('href')) { var new_src = $(this).data('image'); var new_title = $(this).attr('title'); var new_href = $(this).attr('href'); if ($('#zoom_01').attr('src') != new_src) { $('#zoom_01').attr({ 'src': new_src, 'alt': new_title, 'title': new_title }); } } });
      }
    }, 100);
  }

  quickView(data: any) {
    this.quickViewData = data;
    $('#quick-view-product').fadeIn(300);
  }

  updateCart(q: number) {
    let value = $('#quantity-detail').val();
    try {
      if (parseInt(value) + q <= 0) {
        return;
      }
      $('#quantity-detail').val(parseInt(value) + q);
    } catch (error) {
      $('#quantity-detail').val(1);
    }
  }

  clearText(value: string){
    return this.ex.BoDau(value.trim());
  }
}
