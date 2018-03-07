import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {HomePage} from "../home/home";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-upload-activity',
  templateUrl: 'upload-activity.html',
})
export class UploadMeetupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public mediaProvider: MediaProvider) {
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
    console.log('ionViewDidLoad UploadActivityPage');
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
      this.mediaProvider.setTag(this.mediaProvider.meetingTag,response['file_id']).subscribe( response => {
        console.log(response);
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
    setTimeout(() =>
      {
        this.navCtrl.setRoot(TabsPage);
      },
      3500);
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

}
