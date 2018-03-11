import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";
import {TabsPage} from "../tabs/tabs";
import {Tag} from "../../interfaces/tag";

@IonicPage()
@Component({
  selector: 'page-upload-meetup',
  templateUrl: 'upload-meetup.html',
})
export class UploadMeetupPage {

  pushTabs: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
              public viewCtrl: ViewController, public mediaProvider: MediaProvider) {
    this.pushTabs = TabsPage;
  }

  activities: any;
  activity: Media;
  userId: '';

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
  tag: Tag = {
    file_id: 0,
    tagname: ''
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad UploadActivityPage');
  }

  public uploadMeetup() {
    const formData: FormData = new FormData();
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    formData.append('file', this.file);
    this.mediaProvider.uploading(formData).subscribe(response => {
      console.log(response);
      //console.log(response.file_id);
      //myfileid = response.file_id;
      this.mediaProvider.setTag(this.tag.tagname.toLowerCase(), response['file_id']).subscribe(response => {
        console.log(response);
      });
      this.mediaProvider.setTag(this.mediaProvider.meetupTag, response['file_id']).subscribe(response => {
        console.log(response);
      });
      this.mediaProvider.setTag(this.mediaProvider.meetingTag, response['file_id']).subscribe(response => {
        console.log(response);
        this.mediaProvider.addFavourite(response['file_id']).subscribe( response2 => {
          console.log(response2);
        });
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
    setTimeout(() => {
        this.navCtrl.setRoot(TabsPage);
        let toast = this.toastCtrl.create({
          message: 'New activity created',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
        toast.present();
      },
      3500);
  }

  setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }

  getFavouritedActivities() {
    this.mediaProvider.getUserData().subscribe(response => {
      this.userId = response['user_id'];
      this.mediaProvider.getFavourites().subscribe( response => {
        this.activities = response;
      });
    });
  }
}
