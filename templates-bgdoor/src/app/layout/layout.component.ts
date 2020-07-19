import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AfterContentInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { LanguageService } from '../_base/services/language.service';
import { Title } from '@angular/platform-browser';

declare var $;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit, AfterContentInit {

  constructor(
    private lg: LanguageService,

  ) {
    this.lg.get().subscribe(x => {
              
    });
  }

  ngOnInit() {
  }

  ngAfterContentInit() {
  }

}