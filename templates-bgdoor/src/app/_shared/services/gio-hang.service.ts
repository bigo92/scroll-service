import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class GioHangService {

    public lstItemCart$ = new BehaviorSubject<any[]>(this.initData());
    public total: number = 0;
    constructor() { }

    private initData() {
        let carts = [];
        try {
            if (localStorage.getItem('shops')) {
                carts = JSON.parse(localStorage.getItem('shops'));
            }
        } catch (error) {
            localStorage.removeItem('shops');
        }
        return carts;
    }

    get() {
        this.checkTotalMoney(this.initData());
        return this.lstItemCart$.asObservable();
    }

    public addGioHang(item: any, quantity: number = 1) {
        let gioHang = this.initData();
        let indexData = gioHang.find(x => x.id === item.id);
        if (indexData === undefined) {
            gioHang.push({
                id: item.id,
                name: item.name,
                keyName: item.keyName,
                url: item.url,
                price: item.price,
                priceOld: item.priceOld,
                quantity: quantity,
                categoryId: item.categoryId
            });
        } else {
            indexData.quantity += quantity;
        }
        this.checkTotalMoney(gioHang);
        localStorage.setItem('shops', JSON.stringify(gioHang));
        this.lstItemCart$.next(gioHang);
    }

    public removeGioHang(id) {
        let gioHang = this.initData();
        let index = gioHang.findIndex(x => x.id === id);
        if (index !== -1) {
            gioHang.splice(index, 1);
            this.checkTotalMoney(gioHang);
            localStorage.setItem('shops', JSON.stringify(gioHang));
            this.lstItemCart$.next(gioHang);
        }
    }

    public clearGioHang() {
        let gioHang = [];
        this.total = 0;
        localStorage.setItem('shops', JSON.stringify(gioHang));
        this.lstItemCart$.next(gioHang);
    }

    public plusGioHang(id) {
        let gioHang = this.initData();
        let indexData = gioHang.find(x => x.id === id);
        if (indexData !== undefined) {
            indexData.quantity++;
            this.checkTotalMoney(gioHang);
            localStorage.setItem('shops', JSON.stringify(gioHang));
            this.lstItemCart$.next(gioHang);
        }
    }

    public minusGioHang(id) {
        let gioHang = this.initData();
        let indexData = gioHang.find(x => x.id === id);
        if (indexData !== undefined) {
            if (indexData.quantity <= 1) {
                return;
            }
            indexData.quantity--;
            this.checkTotalMoney(gioHang);
            localStorage.setItem('shops', JSON.stringify(gioHang));
            this.lstItemCart$.next(gioHang);
        }
    }

    public updateQuantity(id: any, value: any) {
        if (parseInt(value + '') <= 0) {
            this.removeGioHang(parseInt(id + ''));
        } else {
            let gioHang = this.initData();
            let indexData = gioHang.find(x => x.id + '' === id + '');
            if (indexData !== undefined) {
                indexData.quantity = parseInt(value + '');
                this.checkTotalMoney(gioHang);
                localStorage.setItem('shops', JSON.stringify(gioHang));
                this.lstItemCart$.next(gioHang);
            }
        }
    }


    private checkTotalMoney(gioHang: any[]) {
        let total = 0;
        gioHang.forEach(x => {
            total += x.quantity * x.price;
        })
        this.total = total;
    }

    public JSONData(item: any) {
        return JSON.stringify({
            id: item.id,
            name: item.data.name,
            keyName: item.data.keyName,
            url: item.files.filter(x => x.url !== '').length > 0 ? item.files.filter(x => x.url !== '')[0].url : '',
            price: item.data.price,
            priceOld: item.data.priceOld,
            categoryId: item.data.categoryId
        })
    }
}
