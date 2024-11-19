import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
  standalone: false
})
export class HighlightFavoriteDirective {

  constructor(private eleRef : ElementRef) { 
  }

  @Input() set appHighlightFavorite(isFavorite : boolean){
    if(isFavorite){
      this.eleRef.nativeElement.style.color = 'green';
    } 
  }
}
