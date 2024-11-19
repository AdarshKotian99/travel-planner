import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$'): string {
    return `${currencySymbol} ${value.toFixed(2)}`; 
  }

}
