import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { GioHangService } from '../services/gio-hang.service';
import { ExtensionService } from '../../_base/services/extension.service';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

declare var $;
@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, OnChanges {

  public mask = createNumberMask({
    prefix: '',
    allowNegative: false,
    allowDecimal: false,
    thousandsSeparatorSymbol: ""
  });  

  @Input('data') dataIn: any;
  public data: any;
  constructor(
    public gh: GioHangService,
    private ex: ExtensionService
  ) { }

  ngOnInit() {
    this.initJavascript();
  }

  ngOnChanges(){
    if (this.dataIn === undefined) {
      this.data = undefined;
      return;
    }
    this.dataIn.data.size = this.dataIn.data.size.split(',');
    this.dataIn.data.color = this.dataIn.data.color.split(',');
    this.data = this.dataIn;
  }

  initJavascript(){
    setTimeout(() => {
      $(document).on('click', '.quickview-close, #quick-view-product .quickview-overlay, .fancybox-overlay', function(e){
        $("#quick-view-product").fadeOut(300);
      });
    }, 100);
  }

  clearText(value: string){
    return this.ex.BoDau(value.trim());
  }

}
