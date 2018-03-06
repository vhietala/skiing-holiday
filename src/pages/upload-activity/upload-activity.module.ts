import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadActivityPage } from './upload-activity';

@NgModule({
  declarations: [
    UploadActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadActivityPage),
  ],
})
export class UploadActivityPageModule {}
