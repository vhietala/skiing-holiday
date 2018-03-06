import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AboutPage} from "../about/about";

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  pushAbout: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pushAbout = AboutPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

}
