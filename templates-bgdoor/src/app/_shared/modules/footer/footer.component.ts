import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../services/global-data.service';
import { PhotoService } from '../../services/photo.service';
import { GolobalValid } from '../../../_base/class/golobal-valid';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ExtensionService } from 'src/app/_base/services/extension.service';

declare var $;
@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
    public settingData: any;
    public dataVideo: any[] = [];
    public myForm: FormGroup;
    public isSubmit: boolean;
    constructor(
        private globalData_sv: GlobalDataService,
        private ex: ExtensionService,
        private general_sv: PhotoService, //:todo change name generalService
        private fb: FormBuilder
    ) { }

    async ngOnInit() {
        this.createForm();
        this.settingData = await this.globalData_sv.getSetingData();
        this.getVideos().then(x => this.initVideoSlide());
        this.initChatBox();
    }

    async getVideos() {
        let param = {
            categoryId: 7,
            size: 6
        }
        let rs = await this.general_sv.getData(param);
        this.ex.logDebug('get videos data', rs);
        if (rs.success) {
            rs.data.forEach(x => {
                let id = x.data.video.substring(x.data.video.lastIndexOf('v=') + 2);
                x.video = `https://www.youtube.com/embed/${id}`;
            });
            this.dataVideo = rs.data;
        }
    }

    initVideoSlide() {
        setTimeout(() => {
            $('#lst-videos').owlCarousel({
                loop: true,
                margin: 0,
                nav: false,
                dom: false,
                autoplay: false,
                autoplayTimeout: 5000,
                responsive: {
                    0: {
                        items: 1,
                        nav: true,
                        dots: false,
                    }
                }
            })
        }, 100);
    }

    ScrollMenu() {
        $(window).scroll(function () {
            if ($(document).scrollTop() < 50) {
                $('#scroll').removeClass('backTop');
            } else {
                $('#scroll').addClass('backTop');
            }
        });
    }

    createForm() {
        this.myForm = this.fb.group({
            email: ['', [
                GolobalValid.required({ required: 'Không được để trống' }),
                GolobalValid.mailFormat({ mailFormat: 'Email sai định dạng' })
            ]]
        });
    }

    async onSubmit() {
        let formData = this.myForm.value;
        this.ex.markFormGroupTouched(this.myForm);
        if (this.myForm.invalid) {
            this.ex.alertDialog("Lỗi định dạng", "Email sai định dạng", "red", "Đồng ý");
            return;
        }
        //submit
        this.isSubmit = true;
        let rs = await this.general_sv.Add({
            categoryId: 2,
            data: formData
        })
        this.ex.logDebug('submit', rs);
        if (rs.success) {
            await this.ex.alertDialog('Gửi dữ liệu thành công', 'Chúng tôi sẽ gửi thông tin vào hòm mail của bạn trong thời gian sớm nhất');
            this.myForm.setValue({
                email: '',
            });
            this.ex.markFormGroupUntouched(this.myForm);
        } else {
            this.ex.BindError(this.myForm, rs);
        }
        this.isSubmit = false;
    }

    initChatBox() {
        // setTimeout(() => {
        //  (function (d, s, id) {
        //    var js, fjs = d.getElementsByTagName(s)[0];
        //    js = d.createElement(s); js.id = id;
        //    js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.0&appId=1496515287275529&autoLogAppEvents=1';

        //    if (d.getElementById(id)) {
        //      //if <script id="facebook-jssdk"> exists
        //      delete (<any>window).FB;
        //      fjs.parentNode.replaceChild(js, fjs);
        //    } else {
        //      fjs.parentNode.insertBefore(js, fjs);
        //    }
        //  }(document, 'script', 'facebook-jssdk'));
        // }, 100);
    }
}
