import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadMeetupPage } from './upload-meetup';

@NgModule({
  declarations: [
    UploadMeetupPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadMeetupPage),
  ],
})
export class UploadMeetupPageModule {}
