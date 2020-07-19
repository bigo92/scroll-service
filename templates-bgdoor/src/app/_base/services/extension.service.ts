import { BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable, TemplateRef } from '@angular/core';
import { FormControl, Validators, FormArray, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { BsModalService, } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { HistoryService } from './history.service';
import { GolobalValid } from '../class/golobal-valid';
import { TranslateService } from '@ngx-translate/core';
import { HttpModel } from 'src/app/_base/models/httpModel';


declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ExtensionService {

    private bsModalRef: BsModalRef;
    private configDialog = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered'
    };
    private configAlartDialog = {
        animated: true,
        keyboard: false,
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered modal-alert'
    };
    private lstmodalRef: any[] = [];
    constructor(
        private fb: FormBuilder,
        private bsModalSv: BsModalService,
        private rt: Router,
        private ht: HistoryService,
        private tsl: TranslateService,
    ) { }

    public getUrlParameter(sParam, search: string = null) {
        if (search == null) { search = window.location.search; }
        search = search.replace('?', '');
        let sPageURL = decodeURIComponent(search),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[ i ].split('=');

            if (sParameterName[ 0 ] === sParam) {
                return sParameterName[ 1 ] === undefined ? true : sParameterName[ 1 ];
            }
        }
    }

    public backUrl(urlDefault: string = null) {
        this.ht.backUrl(urlDefault);
    }

    public getFormGroup(obj: any, valid: boolean = true): FormGroup {
        const formGroup: FormGroup = this.fb.group({});
        obj.forEach(x => {
            if (!x.isObject) {
                const formControl = this.getFormControll(x, valid);
                formGroup.addControl(x.name, formControl);
            } else {
                if (x.isArray) {
                    const formArray: FormArray = this.getFormArray(x);
                    formGroup.addControl(x.name, formArray);
                } else {
                    const formGroupChild: FormGroup = this.getFormGroup(x);
                    formGroup.addControl(x.name, formGroupChild);
                }
            }
        });
        return formGroup;
    }

    /**
     * clear all element of form array
     * @param control 
     * @param index 
     */
    public clearElementsFormArray(control: FormArray, index: number = null) {
        if (index !== null) {
            control.removeAt(index);
        } else {
            while (control.length > 0) {
                control.removeAt(0);
            }
        }
    }

    public alertDialog(title: string = '', content: string = '', type: string = 'green', okTxt: string = 'shared.ok'): Promise<any> {
        return new Promise(resolve => {
            this.tsl.get([title, content, okTxt]).subscribe(d => {
                $.alert({
                    type: type,
                    title: d[title],
                    content: d[content],
                    buttons: {
                        ok: {
                            text: d[okTxt],
                            keys: ['enter'],
                            action: function () {
                                resolve(true);
                            }
                        }
                    }
                });
            });
        });
    }

    public confirmDialog(title: string = '', content: string = '', type: string = 'green', okTxt: string = 'shared.ok', cancelTxt: string = 'shared.cancel'): Promise<any> {
        return new Promise(resolve => {
            this.tsl.get([title, content, okTxt, cancelTxt]).subscribe(d => {
                $.confirm({
                    type: type,
                    title: d[title],
                    content: d[content],
                    buttons: {
                        ok: {
                            text: d[okTxt],
                            keys: ['enter'],
                            action: function () {
                                resolve(true);
                            }
                        },
                        cancel: {
                            text: d[cancelTxt],
                            keys: ['esc'],
                            action: function () {
                                resolve(false);
                            }
                        }
                    }
                });
            });
        });
    }

    public markFormGroupTouched(formGroup: any, focus: boolean = true) {
        let controlFocus: any;
        (<any>Object).values(formGroup.controls).forEach(control => {
            try {
                control.markAsTouched();
                if (control instanceof FormControl && focus) {
                    let ctrl = (<FormControl>control);
                    if (ctrl.invalid) {
                        if (controlFocus !== undefined) {
                            controlFocus = this.getControlName(ctrl);
                            $(`*[formcontrolname='${controlFocus}']`).focus();
                        }
                    }
                }
                if (control.controls) {
                    if (controlFocus !== undefined) {
                        focus = false;
                    }
                    control.controls.forEach(c => {
                        if (controlFocus !== undefined) {
                            focus = false;
                        }
                        let result = this.markFormGroupTouched(c, focus)
                        if (result !== undefined && controlFocus !== undefined) {
                            controlFocus = result;
                        }
                    });
                }
                return controlFocus;
            } catch (error) {
                return undefined;
            }
        });


    }

    public markFormGroupUntouched(formGroup: any) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            try {
                control.markAsUntouched();
                if (control.controls) {
                    control.controls.forEach(c => {
                        let result = this.markFormGroupUntouched(c)
                    });
                }
            } catch (error) {
            }
        });
    }

    // set icon button submit success
    // public showMsgSuccessfully(title: string, msg: string, name: string = '') {
    //     return new Promise(resolve => {
    //         this.bsModalRef = this.bsModalSv.show(AlertComponent, this.configAlartDialog);
    //         this.bsModalRef.content.title = title;
    //         this.bsModalRef.content.msg = msg;
    //         this.bsModalRef.content.name = name;
    //         this.bsModalRef.content.getEvents().subscribe(data => {
    //             resolve(true);
    //         });
    //     });
    // }
    // public showMsgSaving(title: string) {
    //     this.bsModalRef = this.bsModalSv.show(SavingComponent, Object.assign({}, this.configDialog, { class: 'modal-processing' }));
    //     this.bsModalRef.content.title = title;
    //     return this.bsModalRef;
    // }
    // public showMsgSubmitFail(msg: string) {
    //     this.bsModalRef = this.bsModalSv.show(AlertComponent, this.configAlartDialog);
    //     this.bsModalRef.content.title = 'An error occurred';
    //     this.bsModalRef.content.msg = msg;
    // }
    public closeModalSaving(bsModalRef: BsModalRef) {
        bsModalRef.hide();
    }
    public openModal(template: TemplateRef<any>, isOneDialog: boolean = true) {
        const index = this.lstmodalRef.findIndex(x => x.temp === template);
        if (index === -1) {
            const itemModel = this.bsModalSv.show(template, Object.assign({}, this.configDialog));
            this.lstmodalRef.push({ temp: template, model: itemModel });
        }
        if (isOneDialog) {
            this.lstmodalRef.filter(x => x.temp !== template).forEach(x => {
                this.closeModal(x.temp);
            })
        }
    }

    public closeModal(template: TemplateRef<any> = null) {
        if (template !== null) {
            const index = this.lstmodalRef.findIndex(x => x.temp === template);
            if (index !== -1) {
                this.lstmodalRef[ index ].model.hide();
                this.lstmodalRef.splice(index, 1);
            }
        } else {
            while (this.lstmodalRef.length > 0) {
                this.lstmodalRef[ 0 ].model.hide();
                this.lstmodalRef.splice(0, 1);
            }
        }
    }
    public BindError(formGroup: FormGroup, data: HttpModel<any>) {
        data.error.forEach(x => {
            let jsonResult = `{"${x.key}": "${x.value !== undefined? x.value : ''}"}`;
            var result = JSON.parse(jsonResult);
            if (formGroup.contains(x.key)) {
                if (!formGroup.get(x.key).hasError(x.key)) {
                    formGroup.get(x.key).setErrors(result);
                }
            } else {
                formGroup.setErrors(result);
            }
        });
    }


    public showLoading(show: boolean, timeout: any = 3000, autoclose: boolean = false) {
        if (show) {
            $('.loading').removeClass('show');
            $('.loading').removeClass('animate');
            $('.loading').removeClass('hide');
            $('.loading').addClass('show').delay(timeout - 1500).queue(function (next) {
                $(this).addClass('animate');
                next();
            });
            if (autoclose) {
                setTimeout(function () {
                    $('.loading').removeClass('show');
                    $('.loading').removeClass('animate');
                    $('.loading').removeClass('hide');
                }, timeout);
            }
        } else {
            $('.loading').removeClass('show');
            $('.loading').removeClass('animate');
            $('.loading').removeClass('hide');
        }
    }

    public roundMoneyNumber(moneyNumber) {
        return Math.round(moneyNumber * 1000) / 1000;
    }

    public logDebug(mess?: any, ...params: any[]) {
        if(true){//if (Config.deploy === 'debugger') {
            console.debug(mess, params);
        }
    }

    public log(mess?: any, ...params: any[]) {
        console.log(mess, params);
    }

    public setFormValue(form: FormGroup, obj: any) {
        // tslint:disable-next-line:forin
        for (const key in obj) {
            let value = obj[ key ];
            if (value === undefined) { value = ''; }
            if (form.get(key) !== null) {
                form.get(key).setValue(value);
            }
        }
        return form;
    }

    public getDiffDate(dateTime1: Date, dateTime2: Date) {
        let result = { day: 0, hour: 0 };
        var timeDiff = Math.abs(dateTime1.getTime() - dateTime2.getTime());
        var diffHour = Math.ceil(timeDiff / (1000 * 3600));
        while (diffHour >= 24) {
            result.day++;
            diffHour = diffHour - 24;
        }
        result.hour = diffHour;
        return result;
    }

    // -----private-----
    private getFormControll(obj: any, val: boolean = true): FormControl {
        let valid = [];
        if (val) {
            obj.validate.forEach(v => {
                let jsonResult = `{"${v.name}": "${v.value!== undefined? v.value.errorMessage: ''}"}`;
                var result = JSON.parse(jsonResult);
                switch (v.name) {
                    case 'required':
                        valid.push(GolobalValid.required(result));
                        break;
                    case 'compare':
                        //valid.push(Validators.required);
                        break;
                    case 'stringlength':
                        //valid.push(Validators.required);
                        break;
                    case 'minlength':
                        valid.push(Validators.min(v.value.minLength));
                        break;
                    case 'maxlength':
                        valid.push(Validators.min(v.value.maxLength));
                        break;
                    case 'emailaddress':
                        valid.push(GolobalValid.mailFormat(result));
                        break;
                    case 'phone':
                        valid.push(GolobalValid.phone(result));
                        break;
                    case 'regularexpression':
                        //valid.push(Validators.required);
                        break;
                }
            });
        }
        let ctrl: FormControl = this.fb.control(obj.value, valid);
        return ctrl;
    }

    private getFormArray(obj: any): FormArray {
        const lstFormGroup: FormGroup[] = [];
        obj.value.forEach(x => {
            const formGroup: FormGroup = this.getFormGroup(x);
            lstFormGroup.push(formGroup);
        });
        const formArray: FormArray = this.fb.array(lstFormGroup);
        return formArray;
    }

    private getControlName(control: AbstractControl) {
        var controlName = null;
        var parent = control[ "_parent" ];

        // only such parent, which is FormGroup, has a dictionary 
        // with control-names as a key and a form-control as a value
        if (parent instanceof FormGroup) {
            // now we will iterate those keys (i.e. names of controls)
            Object.keys(parent.controls).forEach((name) => {
                // and compare the passed control and 
                // a child control of a parent - with provided name (we iterate them all)
                if (control === parent.controls[ name ]) {
                    // both are same: control passed to Validator
                    //  and this child - are the same references
                    controlName = name;
                }
            });
        }
        // we either found a name or simply return null
        return controlName;
    }
    public BoDau(obj: string, reSpace: string = '-', toLower: boolean = true) {
        var str = obj;
        if (str === undefined || str === null || str === '') {
            return '';
        }
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        //str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-");  
        // tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - /
        //str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1-  
        str = str.replace(/^\-+|\-+$/g, "");
        //cắt bỏ ký tự - ở đầu và cuối chuỗi 
        if (reSpace !== null) {
            str = str.replace(new RegExp(' ', 'g'), reSpace);
        }
        if (toLower !== null) {
            if (toLower) {
                str = str.toLowerCase();
            } else {
                str = str.toUpperCase();
            }
        }

        return str;
    }

    public numbericlear(someThing: string, ) {
        return someThing.replace(/\D/g, '');
    }
}
