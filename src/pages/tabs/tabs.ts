import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {ActivityfeedPage} from "../activityfeed/activityfeed";

@IonicPage()
@Component({
  template: `    
      <ion-tabs tabsPlacement="top" class="tabs-basic">
        <ion-tab tabTitle="Profile" [root]="profilePage"></ion-tab>
        <ion-tab tabTitle="Activity Feed" [root]="activityFeed"></ion-tab>
      </ion-tabs>
  `})

export class TabsPage {

  profilePage = ProfilePage;
  activityFeed = ActivityfeedPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
