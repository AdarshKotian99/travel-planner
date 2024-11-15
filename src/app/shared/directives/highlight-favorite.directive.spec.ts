import { HighlightFavoriteDirective } from './highlight-favorite.directive';
import { ElementRef } from '@angular/core';
import { Directive, Input } from '@angular/core';

describe('HighlightFavoriteDirective', () => {
  let directive: HighlightFavoriteDirective;
  let mockElementRef: ElementRef;

  beforeEach(() => {
    // Mocking the ElementRef to simulate DOM element interaction
    mockElementRef = {
      nativeElement: {
        style: {
          background: ''
        }
      }
    } as ElementRef;

    directive = new HighlightFavoriteDirective(mockElementRef);
  });

  it('should create an instance of the directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should highlight the element with green background when isFavorite is true', () => { 
    directive.appHighlightFavorite = true; // Set the input property `isFavorite` to true
    expect(mockElementRef.nativeElement.style.background).toBe('green');  // Check if the background color has set to 'green'
  });

  it('should not highlight the element when isFavorite is false', () => {
    directive.appHighlightFavorite = false; // Set the input property `isFavorite` to false
    expect(mockElementRef.nativeElement.style.background).toBe(''); // Check if the background color has not been set
  });
});
