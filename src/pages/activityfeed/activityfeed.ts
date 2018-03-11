import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {SinglefileviewPage} from "../singlefileview/singlefileview";
import {User} from "../../interfaces/user";
import {Media} from "../../interfaces/media";
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {ActivityPage} from "../activity/activity";

@IonicPage()
@Component({
  selector: 'page-activityfeed',
  templateUrl: 'activityfeed.html',
})
export class ActivityfeedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalCtrl: ModalController, public mediaProvider: MediaProvider) {
  }

  files: any;
  tag : any;
  tags: any = [];
  tempList: any = [];
  //MediaFiles: Media[];
  //file: Media = {
  MediaFiles: any;
  file: Media;
  /* = {
      file_id: 0,
      filename: '',
      title: '',
      description: '',
      user_id: 0,
      media_type: '',
      mime_type: '',
      time_added: '',
      username: ''
    }; */

  meeduska: User;


  ionViewDidLoad() {
    this.mediaProvider.getUserData().subscribe(response => {
      this.displayImages();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  modalOpenImg(id) {
    let modal = this.modalCtrl.create(SinglefileviewPage, {mediaplayerid: id});
    modal.present();
  }

  displayImages() {
    this.mediaProvider.getByTag(this.mediaProvider.activityTag).subscribe(response => {
      console.log(response);
      this.MediaFiles = response;
      this.mediaProvider.getByTag(this.mediaProvider.meetingTag).subscribe(response2 => {
        this.tempList = response2;
        this.MediaFiles.reverse();
        console.log(response2);
        for (let i = 0; i < this.tempList.length; i++) {
          this.MediaFiles.push(this.tempList[i]);
        }
        this.mediaProvider.getByTag(this.mediaProvider.userImgTag).subscribe(response3 => {
          this.tempList = response3;
          for (let k = 0; k < this.tempList.length; k++) {
            this.MediaFiles.push(this.tempList[k]);
            console.log(this.MediaFiles);
          }
        });
      },( error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
      //this.MediaFiles.reverse();
      //make this response type media and try through it?
      //atm it shows 20 objects and it doenst go throoguh them even i have for loop
      //console.log(this.MediaFiles[0].user_id + "EKAN FILEN USERID");
      for (let j = 0; j < this.MediaFiles.length; j++) {
        //console.log(this.MediaFiles[i] + " MEDIAFILES ARR I ");
        this.mediaProvider.getUserInfo(this.MediaFiles[j].user_id).subscribe((ressu: User) => {
          this.meeduska = ressu;
          this.MediaFiles[j].username = this.meeduska.username;
        });
      }
    });
  }

}
