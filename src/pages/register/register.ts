import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {User} from "../../interfaces/user";
import {MediaProvider} from "../../providers/media/media";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginPage} from "../login/login";
import {TabsPage} from "../tabs/tabs";
import {AboutPage} from "../about/about";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  pushAbout: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,
              public mediaProvider: MediaProvider) {
    this.pushAbout = AboutPage;
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

  public hasToken() {
    return localStorage.getItem('token') !== null;
  }

  public register() {
    console.log(this.user);
    if (this.hasToken()) {
      this.mediaProvider.removeUserData();
    }
    this.mediaProvider.register(this.user).subscribe(response => {
      console.log(response);
      //console.log("username+pw: " + this.user.username + '+' + this.user.password);
      this.mediaProvider.login(this.user).subscribe(response => {
        localStorage.setItem('token', response['token']);
        this.mediaProvider.logged = true;
        this.navCtrl.setRoot(TabsPage, {openTab: 1});
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      let toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast')
      });
      toast.present();
    });
  }

  public setLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
