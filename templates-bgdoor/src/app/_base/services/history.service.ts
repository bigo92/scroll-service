import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { PlatformLocation, Location } from '@angular/common';
import { Config } from '../../_shared/modules/_config/config';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

    private saveRow = 10;
    public histStoryPage: string[] = [];
    private isBackUrl: boolean = false;
    private sub: any;
    constructor(
        private rt: Router,
        private pl: PlatformLocation,
        private location: Location
    ) { }

    public start() {
        this.histStoryPage = [];
        this.sub = this.rt.events.subscribe(x => {
            if (x instanceof NavigationEnd) {
                if (!this.isBackUrl) {
                    this.histStoryPage.push(x.url);
                    while (this.histStoryPage.length > this.saveRow) {
                        this.histStoryPage.splice(0, 1);
                    }
                }
                this.isBackUrl = false;
            }
        });
        //fix back browse load data page
        this.pl.onPopState(() => {
            this.isBackUrl = true;
            if (this.histStoryPage.length > 0) {
                this.histStoryPage.splice(this.histStoryPage.length - 1, 1);
            }
        });
    }

    public end() {
        this.sub.unsubscribe();
    }

    public getUrlPage(index: number = 1) {
        if (index < this.histStoryPage.length) {
            return this.histStoryPage[this.histStoryPage.length - 1 - index];
        }
        return null;
    }

    public getHistory() {
        const data = this.getHistory;
        return data;
    }

    public backUrl(urlDefault: string = null) {
        let urlOld = this.getUrlPage(1);        
        let urlBase = Config.url;        
        if (urlOld !== null) {
            this.isBackUrl = true;
            if (this.histStoryPage.length > 0) {
                this.histStoryPage.splice(this.histStoryPage.length - 1, 1);
            }       
            if (urlBase !== '') {
                this.rt.navigateByUrl(urlOld.replace(urlBase,''));
            }else{
                this.rt.navigateByUrl(urlBase);
            }            
        } else if (urlDefault) {
            this.isBackUrl = true;
            if (this.histStoryPage.length > 0) {
                this.histStoryPage.splice(this.histStoryPage.length - 1, 1);
            }
            this.rt.navigateByUrl(urlDefault);
        }else{
            this.location.back();
        }
    }

    public pushState(url:string, viewUrl: boolean = true){
        this.histStoryPage.push(url);
        while (this.histStoryPage.length > this.saveRow) {
            this.histStoryPage.splice(0, 1);
        }
        if (viewUrl) {
            history.pushState('', '', url);
        }
    }
}