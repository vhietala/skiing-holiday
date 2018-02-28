import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
  transform(filename: string, thumbnail?: string): any {

    const smallThumb = '-tn160.png';
    const mediumThumb = '-tn320.png';
    const largeThumb = '-tn640.png';
    const screenshot = '.png';

    const temp = filename.split('.');
    let thumbChoice = '';

    if (thumbnail === 'smallThumb') {
      thumbChoice = temp[0] + smallThumb;
    } else if (thumbnail === 'mediumThumb') {
      thumbChoice = temp[0] + mediumThumb;
    } else if (thumbnail === 'largeThumb') {
      thumbChoice = temp[0] + largeThumb;
    } else if (thumbnail === 'screenshot') {
      thumbChoice = temp[0] + screenshot;
    } else {
      thumbChoice = temp[0] + mediumThumb;
    }
    return thumbChoice;
  }
}
