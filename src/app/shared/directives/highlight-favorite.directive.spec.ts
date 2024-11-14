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
    // Set the input property `isFavorite` to true
    directive.appHighlightFavorite = true;

    // Check if the background color has been set to 'green'
    expect(mockElementRef.nativeElement.style.background).toBe('green');
  });

  it('should not highlight the element when isFavorite is false', () => {
    // Set the input property `isFavorite` to false
    directive.appHighlightFavorite = false;

    // Check if the background color has not been set
    expect(mockElementRef.nativeElement.style.background).toBe('');
  });

  // it('should not highlight the element if isFavorite is undefined', () => {
  //   // Set the input property `isFavorite` to undefined
  //   directive.appHighlightFavorite = undefined;

  //   // Check if the background color is not set
  //   expect(mockElementRef.nativeElement.style.background).toBe('');
  // });

  it('should update background color when input value changes', () => {
    // Set the input property `isFavorite` to true
    directive.appHighlightFavorite = true;

    // Check if the background color has been set to 'green'
    expect(mockElementRef.nativeElement.style.background).toBe('green');

    // Change the input property to false
    directive.appHighlightFavorite = false;

    // Check if the background color is reset (not green)
    expect(mockElementRef.nativeElement.style.background).toBe('');
  });
});
