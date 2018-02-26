import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpErrorResponse} from "@angular/common/http";
import {SinglefileviewPage} from "../singlefileview/singlefileview";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  files: any;
  MediaFiles: any;
  file: Media = {
    file_id: 0,
    filename: '',
    title: '',
    description: '',
    user_id: 0,
    media_type: '',
    mime_type: '',
    time_added: ''
  };

  ionViewDidLoad() {
    this.mediaProvider.getUserData().subscribe(response => {
      console.log('Welcome ' + response['full_name']);
      this.displayImages();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.navCtrl.push(LoginPage);
    });
  }

  displayImages() {
    this.mediaProvider.getNewFiles().subscribe(response => {
      console.log(response);
      this.MediaFiles = response;
    });
  }

  openOnePic(id) {
    this.navCtrl.push(SinglefileviewPage, {mediaplayerid: id});
  }

}
