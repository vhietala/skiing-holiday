import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {SinglefileviewPage} from "../singlefileview/singlefileview";
import {User} from "../../interfaces/user";
import {Media} from "../../interfaces/media";
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";

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
  MediaFiles: any = [];
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
      //console.log(response);
      this.MediaFiles = response;
      this.MediaFiles.reverse();
      for (let j = 0; j < this.MediaFiles.length; j++) {
        //console.log(this.MediaFiles[i] + " MEDIAFILES ARR I ");
        this.mediaProvider.getTagByFileId(this.MediaFiles[j].file_id).subscribe(response => {
          console.log(response);
          this.tags = response;
          this.mediaProvider.getUserInfo(this.MediaFiles[j].user_id).subscribe((ressu: User) => {
            this.meeduska = ressu;
            this.MediaFiles[j].username = this.meeduska.username;
          });
        });
        //console.log(this.MediaFiles[j].tag);
      }

      },( error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
      //make this response type media and try through it?
      //atm it shows 20 objects and it doenst go throoguh them even i have for loop
      //console.log(this.MediaFiles[0].user_id + "EKAN FILEN USERID");
  }
}
