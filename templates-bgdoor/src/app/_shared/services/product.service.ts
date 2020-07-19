import { Injectable } from '@angular/core';
import { Config } from '../modules/_config/config';
import { HttpService } from 'src/app/_base/services/http.service';

@Injectable()
export class ProductService {
    private url = `${Config.url}/api/Product`;
    constructor(private http: HttpService) { }

    public InitGet(search: string) {
        let url = `${this.url}/InitGet`;
        var params = this.http.SearchTojson(search);
        return this.http.getApiAsync<any>(url, params);
    }

    public getData(params: any = null, pushState: boolean = false) {
        if (params.where != null && typeof params.where !== 'string') {
            params.where = JSON.stringify(params.where);
        }
        return this.http.getApiAsync<any[]>(this.url, params, false, pushState);
    }

    public initAdd(params: any = null) {
        let url = `${this.url}/InitPost`;
        return this.http.getApiAsync<any>(url, params);
    }

    public Add(params: any = null) {
        return this.http.postApiAsync<any>(this.url, params);
    }

    public initEdit(params: any) {
        let url = `${this.url}/InitPut`;
        return this.http.getApiAsync<any>(url, params);
    }

    public Edit(id: number, params: any = null) {
        let url = `${this.url}?id=${id}`;
        return this.http.putApiAsync<any>(url, params);
    }

    public Patch(id: number, params: any = null) {
        let url = `${this.url}?id=${id}`;
        return this.http.patchApiAsync<any>(url, params);
    }

    public FindOne(params: any) {
        let url = `${this.url}/FindOne`;
        return this.http.getApiAsync<any>(url, params);
    }

    public Delete(params: any) {
        return this.http.deleteApiAsync<any>(this.url, params);
    }

    public UploadFile(data: any) {
        const url = `${this.url}/upload`;
        return this.http.uploadApiAsync<any[]>(url, data);
    }
}