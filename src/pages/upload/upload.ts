import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";
import {HomePage} from "../home/home";

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  file: File;
  media: Media = {
    file_id: 0,
    filename: '',
    title: '',
    description: '',
    user_id: 0,
    media_type: '',
    mime_type: '',
    time_added: '',
    username: '',
  };


  ionViewDidLoad() {
    console.log('ionViewDidLoad Upload0Page');
  }

  public upload() {
    const formData: FormData = new FormData();
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    formData.append('file', this.file);
    this.mediaProvider.uploading(formData).subscribe(response => {
      console.log(response);
      //console.log(response.file_id);
      //myfileid = response.file_id;
      this.mediaProvider.setTag(this.mediaProvider.meetupTag, response["file_id"]).subscribe(response => {
        console.log(response);
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
    setTimeout(() =>
      {
        this.navCtrl.setRoot(HomePage);
      },
      3500);
  }

  public setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }
}
