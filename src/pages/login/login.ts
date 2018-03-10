import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {RegisterPage} from "../register/register";
import {AboutPage} from "../about/about";
import {TabsPage} from "../tabs/tabs";

interface User {}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, public modalCtrl: ModalController) {
  }

  user: User = {
    password: '',
    username: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (this.hasToken()) {
      this.mediaProvider.getUserData().subscribe(response => {
        console.log('Welcome ' + response['username']);
        this.navCtrl.setRoot(TabsPage);
        this.mediaProvider.logged = true;
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    }
  }

  modalAbout() {
      let modal = this.modalCtrl.create(AboutPage);
      modal.present();
  }


  hasToken() {
    return localStorage.getItem('token') !== null;
  }

  login() {
    // console.log('uname: ' + this.user.username);
    // console.log('pwd: ' + this.password);
    /* const body = {
      username: this.user.username,
      password: this.user.password,
    }; */
    this.mediaProvider.login(this.user).subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.navCtrl.setRoot(TabsPage);
      this.mediaProvider.logged = true;
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  pushRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
