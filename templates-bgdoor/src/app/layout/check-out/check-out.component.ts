import { Component, OnInit } from '@angular/core';
import { GioHangService } from '../../_shared/services/gio-hang.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GolobalValid } from 'src/app/_base/class/golobal-valid';
import { ExtensionService } from 'src/app/_base/services/extension.service';
import { CheckOutService } from 'src/app/_shared/services/check-out.service';
import { GlobalDataService } from '../../_shared/services/global-data.service';
import { Router } from '@angular/router';

declare var $;
@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {

  public url:string = '';
  public myForm: FormGroup;
  public isSubmit: boolean;
  public giohang: any[] = [];
  public isDevice: string = 'desktop';
  constructor(
    private ex: ExtensionService,
    public gh: GioHangService,
    private rt: Router,
    private fb: FormBuilder,
    private sv: CheckOutService,
    private globalData_sv: GlobalDataService 
  ) { }

  ngOnInit() {
    this.gh.get().subscribe(x => {
      this.giohang = x;
    });
    this.createForm();
    this.getDevice();
    this.getBannerTop();
  }

  async getBannerTop() {
    let settingData = await this.globalData_sv.getSetingData();
    if (settingData !== null) {
      let urlData = settingData.files.find(x=>x.flag === 'bannerTop');
      if (urlData !== undefined) {
        this.url = urlData.url;
      }
    }
  }

  getDevice(){
    setTimeout(() => {      
      if ($(window).width() <= 700) {
        this.isDevice = 'mobile';
      }else{
        this.isDevice = 'desktop';
      }
    }, 100);
  }

  createForm(){
    this.myForm = this.fb.group({
      name: ['', [GolobalValid.required({required: 'Tên không được để trống'})]],
      email: ['',[GolobalValid.mailFormat({fomat:'Email sai định dạng'})]],
      phone: ['',[GolobalValid.required({required: 'Số điện thoại không được để trống'}),GolobalValid.phone({required: 'Số điện thoại không đúng định dạng'})]],
      address: ['',[GolobalValid.required({required: 'Địa chỉ nhận hàng không được để trống'})]]
    });
  }

  async onSubmit(){
    let formData: any = this.myForm.value;
    this.ex.logDebug('onSubmit', formData);
    formData.order = this.giohang;
    formData.total = this.gh.total;
    formData.status = 0;
    this.ex.markFormGroupTouched(this.myForm);
    if (this.myForm.invalid) {
      return;
    }
    if (formData.order === undefined || formData.order.length === 0) {
      this.ex.alertDialog('Đơn hàng chưa có sản phẩm', 'vui lòng chọn sản phẩm vào giỏ hàng rồi thử lại');
      return;
    }
    this.isSubmit = true;
    let rs = await this.sv.Add(formData);
    this.ex.logDebug('submit data', rs);
    if (rs.success) {
      await this.ex.alertDialog('Đã đặt hàng thành công', 'Cảm ơn quý khách hàng đã tin dùng sản phẩm của bgdoor. Chúng tôi sẽ liên hệ lại sớm nhất để xác nhận đơn hàng và giao hàng tận nơi','green','Đồng ý');
      localStorage.removeItem('shops'); 
      location.reload();     
    }else{
      this.ex.BindError(this.myForm,rs);
    }
    this.isSubmit = false;
  }

  async removeCartAll(){
    let result = await this.ex.confirmDialog('Xóa giỏ hàng','Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng không?','red','Đồng ý', 'Hủy');
    if (result) {
      this.gh.clearGioHang();
      this.rt.navigate(['/san-pham']);
    }   
  }
}
