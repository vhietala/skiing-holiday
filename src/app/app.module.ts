import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {SplashScreen} from '@ionic-native/splash-screen';
import {MediaProvider} from '../providers/media/media';
import {StatusBar} from '@ionic-native/status-bar';
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {FormsModule} from "@angular/forms";
import {Camera} from "@ionic-native/camera";

import {SinglefileviewPage} from "../pages/singlefileview/singlefileview";
import {UploadPage} from "../pages/upload/upload";
import {ProfilePage} from "../pages/profile/profile";
import {RegisterPage} from "../pages/register/register";
import {LoginPage} from "../pages/login/login";
import {PipesModule} from "../pipes/pipes.module";
import {AboutPage} from "../pages/about/about";
import {LogoutPage} from "../pages/logout/logout";
import {TabsPage} from "../pages/tabs/tabs";
import {ActivityfeedPage} from "../pages/activityfeed/activityfeed";
import {UploadActivityPage} from "../pages/upload-activity/upload-activity";
import {ActivityPage} from "../pages/activity/activity";
import {UploadMeetupPage} from "../pages/upload-meetup/upload-meetup";
import {MeetingfeedPage} from "../pages/meetingfeed/meetingfeed";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    SinglefileviewPage,
    AboutPage,
    LogoutPage,
    TabsPage,
    ActivityfeedPage,
    UploadActivityPage,
    UploadPage,
    ActivityPage,
    UploadMeetupPage,
    MeetingfeedPage,
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
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    SinglefileviewPage,
    AboutPage,
    LogoutPage,
    TabsPage,
    ActivityfeedPage,
    UploadActivityPage,
    ActivityPage,
    UploadMeetupPage,
    MeetingfeedPage,
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

