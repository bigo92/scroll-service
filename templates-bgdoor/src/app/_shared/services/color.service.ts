import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  private lstColor: any[] = [];
  constructor() { }

  getColor(name: string) {
    name = name.toLowerCase();
    let data = this.lstColor.find(x => x.name === name);
    if (data !== undefined) {
      return data.code;
    } else {
      return '#fff';
    }
  }

}
