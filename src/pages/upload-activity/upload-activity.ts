import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";

import {TabsPage} from "../tabs/tabs";


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
  tagList: any = [];
  tagListById: any = [];
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
    this.mediaProvider.getByTag(this.mediaProvider.activityTag).subscribe(response => {
      console.log(response);
      this.tagList = response;
      let keepGoing = true;
      while (keepGoing) {
        for (let i = 0; i < this.tagList.length; i++)
          this.mediaProvider.getTagByFileId(this.tagList[i].file_id).subscribe(response2 => {
            this.tagListById = response2;
            console.log(response2);
            for (let j = 0; j < this.tagListById.length; j++) {
              if (this.tagListById[j].tag !== this.media.title.toLowerCase()) {
                console.log('activity available');
                console.log(this.media.title.toLowerCase());
                /*this.mediaProvider.uploading(formData).subscribe(response => {
                  //console.log(response);
                  //console.log(response.file_id);
                  //myfileid = response.file_id;
                  this.mediaProvider.setTag(this.mediaProvider.meetupTag, response['file_id']).subscribe(response => {
                    //console.log(response);
                  });
                  this.mediaProvider.setTag(this.mediaProvider.activityTag, response['file_id']).subscribe(response => {
                    //console.log(response);
                  });
                  this.mediaProvider.setTag(this.media.title.toLowerCase(), response['file_title']).subscribe(response => {
                    //console.log(response);
                  });
                  this.mediaProvider.addFavourite(response['file_id']).subscribe(response2 => {
                    console.log(response2);
                  });
                }, (error: HttpErrorResponse) => {
                  console.log(error.error.message);
                });*/
                setTimeout(() => {
                    this.navCtrl.setRoot(TabsPage, {openTab: 2});
                    let toast = this.toastCtrl.create({
                      message: 'New activity created',
                      duration: 3000,
                      position: 'top'
                    });
                    toast.onDidDismiss(() => {
                      console.log('Dismissed toast');
                    });
                    keepGoing = false;
                    toast.present();
                  },
                  1000);
              } else {
                let toast = this.toastCtrl.create({
                  message: 'This activity already exists!',
                  duration: 3000,
                  position: 'top'
                });
                toast.onDidDismiss(() => {
                  console.log('Dismissed toast')
                });
                toast.present();
              }
            }
          });
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
