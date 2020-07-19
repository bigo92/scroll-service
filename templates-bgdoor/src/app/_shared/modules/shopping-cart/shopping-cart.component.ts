import { Component, OnInit, ViewEncapsulation, EventEmitter, OnDestroy } from '@angular/core';
import { GioHangService } from '../../services/gio-hang.service';
import { ExtensionService } from '../../../_base/services/extension.service';

declare var $;
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  public title: string;
  public lstEvent: EventEmitter<any> = new EventEmitter<any>();
  public gioHang: any[] = [];
  public sub: any;
  constructor(
    public gh: GioHangService,
    private ex: ExtensionService
  ) { }

  ngOnInit() {
    this.sub = this.gh.get().subscribe(x => {
      this.gioHang = x;
    });
    this.ngInitJS();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  closeDialog() {
    this.lstEvent.emit(false);
  }

  updateQuantity(event) {
    let element = $(event.currentTarget);
    let id = $(element).attr('data-id');
    let value = $(element).val();
    this.gh.updateQuantity(id, value);
  }

  async ngInitJS() {
    let outside = this;
    setTimeout(() => {
      $(document).on('click', '.add-cart', function () {
        let item = JSON.parse($(this).attr('jsonData'));
        let quantity = 1;
        if ($(this).parent().find('.quantity-cart').length > 0) {
          let value = parseInt($(this).parent().find('.quantity-cart').val());
          if (value + '' !== 'NaN') {
            quantity = value;
          } else {
            quantity = 1;
          }
        }
        outside.gh.addGioHang(item, quantity);
        $('#popup-cart').fadeIn(0);
        //---
        $("#quick-view-product").fadeOut(300);
      });

      $(document).on('click', '.remove-cart', function () {
        outside.ex.confirmDialog('Xóa sản phẩm', 'Bạn có chắc chắn muốn xóa sản phẩm này không?','red', 'Đồng ý', 'Hủy').then(x => {
          if (x) {
            let id = parseInt(JSON.parse($(this).attr('data-id')));
            outside.gh.removeGioHang(id);
          }
        })
      });

      $(document).on('click', '.minus-cart', function () {
        let id = parseInt(JSON.parse($(this).attr('data-id')));
        outside.gh.minusGioHang(id);
      });

      $(document).on('change', '.quantity-cart', function () {
        let id = $(this).attr('data-id');
        if (id !== undefined) {
          let value: any = parseInt($(this).val());
          if (value + '' !== 'NaN') {
            outside.gh.updateQuantity(parseInt(id), parseInt($(this).val()));
          } else {
            $(this).val(1);
            outside.gh.updateQuantity(parseInt(id), 1);
          }
        }
      });

      $(document).on('click', '.plus-cart', function () {
        let id = parseInt(JSON.parse($(this).attr('data-id')));
        outside.gh.plusGioHang(id);
      });

      $(document).on('click', '.open-cart', function () {
        if ($(window).width() <= 768) {
          location.href = '/dat-hang';
        } else {
          $('#popup-cart').fadeIn(0);
        }
      });

      $(document).on('click', '.close-cart', function () {
        $('#popup-cart').fadeOut(300);
        //-----
        $("#quick-view-product").fadeOut(300);
      })
    }, 100);
  }

}
