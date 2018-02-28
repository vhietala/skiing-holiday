import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../home/home";
import {MediaProvider} from "../../providers/media/media";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


interface User {

}


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  user: User = {
    password: '',
    username: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (localStorage.getItem('token') !== null) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response['username']);
        this.navCtrl.setRoot(HomePage);
        this.mediaProvider.logged = true;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
  }

  public login() {
    //console.log('uname: ' + this.user.username);
    // console.log('pwd: ' + this.password);
    /*const body = {
      username: this.user.username,
      password: this.user.password,
    }; */
    this.mediaProvider.login(this.user).subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(HomePage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }
}