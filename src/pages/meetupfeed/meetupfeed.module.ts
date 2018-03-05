import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetupfeedPage } from './meetupfeed';

@NgModule({
  declarations: [
    MeetupfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetupfeedPage),
  ],
})
export class MeetupfeedPageModule {}
