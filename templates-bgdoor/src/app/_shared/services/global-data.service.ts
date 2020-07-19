import { Injectable } from '@angular/core';
import { SettingService } from './setting.service';
import { ProductCategoryService } from './productCategory.service';
import { ExtensionService } from 'src/app/_base/services/extension.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private settingData: any = null;
  private categoryData: any = null;
  constructor(
    private setting_sv: SettingService,
    private productCategory_sv: ProductCategoryService,
    private ex: ExtensionService
  ) { }

  async getSetingData() {
    if (this.settingData !== null) {
      return this.settingData;
    }
    let rs = await this.setting_sv.getData({
      categoryId: 1,
      size: 1
    });
    this.ex.logDebug('getSetingData',rs);
    if (rs.success && rs.data.length > 0) {
      this.settingData = rs.data[0];
    }
    return this.settingData;
  }

  async getCategory(){
    if (this.categoryData !== null) {
      return this.categoryData;
    }
    let rs = await this.productCategory_sv.FindOne({id:1});
    this.ex.logDebug('get category', rs);
    if (rs.success) {
      let data = rs.data.data.setting.find(x=>x.keyName === 'categoryId');
      if (data !== undefined) {
        this.categoryData = data.dataSource;
      }
    }
    return this.categoryData;
  }
}
