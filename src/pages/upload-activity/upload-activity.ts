import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";
import {TabsPage} from "../tabs/tabs";
import {ActivityPage} from "../activity/activity";

@IonicPage()
@Component({
  selector: 'page-upload-activity',
  templateUrl: 'upload-activity.html',
})
export class UploadActivityPage {

  pushTabs: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
              public viewCtrl: ViewController, public mediaProvider: MediaProvider) {
    this.pushTabs = TabsPage;
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

  public uploadActivity() {
    const formData: FormData = new FormData();
    formData.append('title', this.media.title);
    formData.append('description', this.media.description);
    formData.append('file', this.file);
    this.mediaProvider.getByTag(this.media.title.toLowerCase()).subscribe( response => {
      console.log(response);
      if (!response) {
        this.mediaProvider.uploading(formData).subscribe(response => {
          //console.log(response);
          //console.log(response.file_id);
          //myfileid = response.file_id;
          if (this.media.title.toLowerCase())
            this.mediaProvider.setTag(this.mediaProvider.meetupTag,response['file_id']).subscribe( response => {
              //console.log(response);
            });
          this.mediaProvider.setTag(this.mediaProvider.activityTag,response['file_id']).subscribe( response => {
            //console.log(response);
          });
          this.mediaProvider.setTag(this.media.title.toLowerCase(),response['file_title']).subscribe( response => {
            //console.log(response);
          });
        }, (error: HttpErrorResponse) => {
          console.log(error.error.message);
        });
        setTimeout(() =>
          {
            this.navCtrl.push(ActivityPage);
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
          1000);
      } else {
        let toast = this.toastCtrl.create( {
          message: 'This activity already exists!',
          duration: 3000,
          position: 'top'
        });
        toast.onDidDismiss( () => {
          console.log('Dismissed toast')
        });
        toast.present()
      }
    });
  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }

  public setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }
}
