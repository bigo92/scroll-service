import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LanguageService } from './_base/services/language.service';
import { HistoryService } from './_base/services/history.service';
import { ScrollService } from './_base/services/scroll.service';

declare var $;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public myForm: FormGroup
  title = 'app';
  constructor(
    private lg: LanguageService,
    private ht: HistoryService,
    private sr: ScrollService
  ){}
  ngOnInit() {
    this.ht.start();
    this.sr.start();
  }
}
