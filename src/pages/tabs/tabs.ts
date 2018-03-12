import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {ActivityfeedPage} from "../activityfeed/activityfeed";
import {MeetingfeedPage} from "../meetingfeed/meetingfeed";

@IonicPage()
@Component({
  template: `    
      <ion-tabs color="secondary" tabsPlacement="top" class="tabs-basic">
        <ion-tab tabTitle="Profile" [root]="profilePage"></ion-tab>
        <ion-tab tabTitle="Activity Feed" [root]="activityFeed"></ion-tab>
        <ion-tab tabTitle="Meetup Feed" [root]="meetupFeed"></ion-tab>
      </ion-tabs>
  `})

export class TabsPage {

  profilePage = ProfilePage;
  activityFeed = ActivityfeedPage;
  meetupFeed = MeetingfeedPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
