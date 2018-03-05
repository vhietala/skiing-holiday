import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {User} from "../../interfaces/user";
import {MediaProvider} from "../../providers/media/media";
import {HomePage} from "../home/home";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  user: User = {
    password: '',
    username: '',
    email: '',
    full_name: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

 /* public hasToken() {
    return localStorage.getItem('token') !== null;
  }
*/
  public register() {
    console.log(this.user);
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log(response);
      //this.mediaProvider.username = this.user.username;
      //this.mediaProvider.password = this.user.password;
      console.log("username+pw: " + this.user.username + '+' + this.user.password);
      if (this.hasToken()) {
        this.mediaProvider.removeUserData();
      }
      this.mediaProvider.login(this.user);
      this.mediaProvider.logged = true;
      this.navCtrl.setRoot(HomePage);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  public hasToken() {
    return localStorage.getItem('token') !== null;
  }

  public setLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
