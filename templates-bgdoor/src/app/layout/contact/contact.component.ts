import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../_shared/services/photo.service';
import { FormBuilder, FormGroup } from '../../../../node_modules/@angular/forms';
import { GolobalValid } from '../../_base/class/golobal-valid';
import { GlobalDataService } from '../../_shared/services/global-data.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public url: any;
  public dataSetting: any;
  public myForm: FormGroup;
  public isSubmit: boolean;
  constructor(
    private ex: ExtensionService,
    private contact_sv: PhotoService, //:todo change name generalService
    private fb: FormBuilder,
    private globalData_sv: GlobalDataService
  ) { }

  async ngOnInit() {
    this.createForm();
    this.dataSetting = await this.globalData_sv.getSetingData();
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

  createForm() {
    this.myForm = this.fb.group({
      name: ['', [GolobalValid.required({ required: 'Không được để trống' })]],
      email: ['', [
        GolobalValid.required({ required: 'Không được để trống' }),
        GolobalValid.mailFormat({ mailFormat: 'Email sai định dạng' })
      ]],
      phone: ['', [GolobalValid.required({ required: 'Không được để trống' })]],
      content: ['', [GolobalValid.required({ required: 'Không được để trống' })]],
      status:['0']
    });
  }

  async onSubmit() {
    let formData = this.myForm.value;
    this.ex.markFormGroupTouched(this.myForm);
    if (this.myForm.invalid) {
      return;
    }
    //submit
    this.isSubmit = true;
    let rs = await this.contact_sv.Add({
      categoryId: 1,
      data: formData
    })
    this.ex.logDebug('submit', rs);
    if (rs.success) {
      await this.ex.alertDialog('Gửi dữ liệu thành công','Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất','green','Đồng ý');
      this.myForm.setValue({
        name:'',
        email:'',
        phone:'',
        content: '',
        status: '0'
      });
      this.ex.markFormGroupUntouched(this.myForm);
    } else {
      this.ex.BindError(this.myForm, rs);
    }
    this.isSubmit = false;
  }
}
