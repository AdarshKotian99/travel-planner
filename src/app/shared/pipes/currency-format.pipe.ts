import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencySymbol: string = '$'): string {
    if (value == null) return '';

    return `${currencySymbol} ${value.toFixed(2)}`;  // Customize the format as needed
  }

}
