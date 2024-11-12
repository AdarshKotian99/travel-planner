import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]'
})
export class HighlightFavoriteDirective {

  constructor(private eleRef : ElementRef) { 
    //eleRef.nativeElement.style.background = 'green';
  }

  @Input() set appHighlightFavorite(isFavorite : boolean){
    if(isFavorite){
      this.eleRef.nativeElement.style.background = 'green';
    } 
  }
}
