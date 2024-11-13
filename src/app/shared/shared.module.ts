import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurncateDescriptionPipe } from './pipes/turncate-description.pipe';
import { HighlightFavoriteDirective } from './directives/highlight-favorite.directive';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';



@NgModule({
  declarations: [
    TurncateDescriptionPipe,
    HighlightFavoriteDirective,
    CurrencyFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TurncateDescriptionPipe,
    HighlightFavoriteDirective,
    CurrencyFormatPipe
  ]
})
export class SharedModule { }
