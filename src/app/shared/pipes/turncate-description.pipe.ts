import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turncateDescription',
  standalone:false
})
export class TurncateDescriptionPipe implements PipeTransform {

  transform(description: string,limit:number): string {
    return description.length > limit ? description.substring(0,limit)+' ...' : description;
  }

}
