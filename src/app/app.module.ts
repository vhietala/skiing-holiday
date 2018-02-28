<<<<<<< HEAD
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
=======
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
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5

@NgModule({
  declarations: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage
=======
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    SinglefileviewPage,
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
<<<<<<< HEAD
=======
    HttpClientModule,
    FormsModule,
    HttpModule,
    PipesModule
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
<<<<<<< HEAD
    ListPage
=======
    ListPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    UploadPage,
    SinglefileviewPage,
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5
  ],
  providers: [
    StatusBar,
    SplashScreen,
<<<<<<< HEAD
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
=======
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    HttpClientModule,
    PhotoViewer,
  ]
})
export class AppModule {
}
>>>>>>> 8974bb173595c5a90dfdb116b374d124a4ab62b5
