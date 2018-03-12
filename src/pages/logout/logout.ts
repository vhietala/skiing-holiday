import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
    this.mediaProvider.removeUserData();
    this.navCtrl.setRoot(LoginPage);
    this.mediaProvider.logged = false;
  }
}
