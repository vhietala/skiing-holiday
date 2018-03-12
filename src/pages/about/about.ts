import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  pushAbout: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.pushAbout = AboutPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
