import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { TimeFormatPipe } from './time-format/time-format';
@NgModule({
	declarations: [ThumbnailPipe,
    TimeFormatPipe],
	imports: [],
	exports: [ThumbnailPipe,
    TimeFormatPipe]
})
export class PipesModule {}
