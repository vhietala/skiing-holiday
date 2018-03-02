import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {ActivityfeedPage} from "../activityfeed/activityfeed";
import {MeetupfeedPage} from "../meetupfeed/meetupfeed";

@IonicPage()
@Component({
  template: `
    <ion-tabs class="tabs-basic">
      <ion-tab tabTitle="Profile" [root]="profilePage"></ion-tab>
      <ion-tab tabTitle="Activity" [root]="activityFeed"></ion-tab>
      <ion-tab tabTitle="MeetUp" [root]="meetupFeed"></ion-tab>
    </ion-tabs>
`})

export class TabsPage {

  profilePage = ProfilePage;
  activityFeed = ActivityfeedPage;
  meetupFeed = MeetupfeedPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
