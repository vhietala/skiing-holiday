import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {ListPage} from '../pages/list/list';
import {HomePage} from '../pages/home/home';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaProvider} from '../providers/media/media';
import {HttpClientModule} from "@angular/common/http";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {SinglefileviewPage} from "../pages/singlefileview/singlefileview";
import {UploadPage} from "../pages/upload/upload";
import {ProfilePage} from "../pages/profile/profile";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {PipesModule} from "../pipes/pipes.module";
import {AboutPage} from "../pages/about/about";
import {LogoutPage} from "../pages/logout/logout";
import {TabsPage} from "../pages/tabs/tabs";
import {ActivityfeedPage} from "../pages/activityfeed/activityfeed";
import {MeetupfeedPage} from "../pages/meetupfeed/meetupfeed";
import {Camera} from "@ionic-native/camera";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    SinglefileviewPage,
    AboutPage,
    LogoutPage,
    TabsPage,
    ActivityfeedPage,
    MeetupfeedPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    HttpModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    SinglefileviewPage,
    AboutPage,
    LogoutPage,
    TabsPage,
    ActivityfeedPage,
    MeetupfeedPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    HttpClientModule,
    PhotoViewer,
    Camera,
  ]
})
export class AppModule {
}

