import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityfeedPage } from './activityfeed';

@NgModule({
  declarations: [
    ActivityfeedPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityfeedPage),
  ],
})
export class ActivityfeedPageModule {}
