import { Injectable } from '@angular/core';
import { HttpService } from '../../_base/services/http.service';
import { Config } from '../modules/_config/config';

@Injectable()
export class CheckOutService {

    constructor(private http: HttpService) { }

    public getInit(search: string) {
        let url = `${Config.url}/api/CheckOut/search`;
        var params = this.http.SearchTojson(search);
        return this.http.getApiAsync<any>(url, params);
    }

    public getData(params: any = null) {
        let url = `${Config.url}/api/CheckOut`;
        return this.http.getApiAsync<any[]>(url, params);
    }

    public initAdd(params: any = null) {
        let url = `${Config.url}/api/CheckOut/Add`;
        return this.http.getApiAsync<any>(url, params);
    }


    public Add(params: any = null) {
        let url = `${Config.url}/api/CheckOut`;
        return this.http.postApiAsync<any>(url, params);
    }

    public initEdit(params: any = null) {
        let url = `${Config.url}/api/CheckOut/Edit`;
        return this.http.getApiAsync<any>(url, params);
    }


    public getDetail(params: any)
    {
        let url = `${Config.url}/api/CheckOut/findOne`;
        return this.http.getApiAsync<any>(url, params);
    }

}
