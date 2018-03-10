import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the TimeFormatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'timeFormat',
})
export class TimeFormatPipe implements PipeTransform {
  /**
   * Takes a timestamp and edits it nicely.
   */
  transform(timestamp: string): string {
    let finalTimeStamp = '';
    const dateSplit = timestamp.split('T');
    const date = dateSplit[0];
    const timeLong = dateSplit[1];
    const timeSplit = timeLong.split('.');
    const time = timeSplit[0];


    finalTimeStamp = date + ' ' + time;

    return finalTimeStamp;
  }
}
