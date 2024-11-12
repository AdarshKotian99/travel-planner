import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurncateDescriptionPipe } from './pipes/turncate-description.pipe';
import { HighlightFavoriteDirective } from './directives/highlight-favorite.directive';



@NgModule({
  declarations: [
    TurncateDescriptionPipe,
    HighlightFavoriteDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TurncateDescriptionPipe,
    HighlightFavoriteDirective
  ]
})
export class SharedModule { }
