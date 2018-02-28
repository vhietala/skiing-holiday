<<<<<<< HEAD
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
=======
import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {RegisterPage} from "../pages/register/register";
import {ProfilePage} from "../pages/profile/profile";
import {UploadPage} from "../pages/upload/upload";
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

<<<<<<< HEAD
  pages: Array<{title: string, component: any}>;
=======
  pages: Array<{ title: string, component: any }>;
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
<<<<<<< HEAD
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
=======
      {title: 'Home', component: HomePage},
      {title: 'Login', component: LoginPage},
      {title: 'Register', component: RegisterPage},
      {title: 'Profile', component: ProfilePage},
      {title: 'Upload', component: UploadPage},
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
