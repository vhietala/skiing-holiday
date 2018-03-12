import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetingfeedPage } from './meetingfeed';

@NgModule({
  declarations: [
    MeetingfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetingfeedPage),
  ],
})
export class MeetingfeedPageModule {}
