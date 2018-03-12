import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LogoutPage} from "../pages/logout/logout";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {UploadActivityPage} from "../pages/upload-activity/upload-activity";
import {UploadMeetupPage} from "../pages/upload-meetup/upload-meetup";
import {UploadPage} from "../pages/upload/upload";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any , icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Profile', component: TabsPage, icon: 'contact'},
      {title: 'Upload an Image', component: UploadPage, icon: 'bicycle'},
      {title: 'Create a new Activity', component: UploadActivityPage, icon: 'contacts'},
      {title: 'Create a new Meet Up', component: UploadMeetupPage, icon: 'images'},
      {title: 'Logout', component: LogoutPage, icon: 'log-out'},
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
