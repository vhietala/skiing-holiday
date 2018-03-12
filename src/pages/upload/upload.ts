import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";
import {TabsPage} from "../tabs/tabs";


@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public toastCtrl: ToastController,
              public navParams: NavParams, public mediaProvider: MediaProvider) {
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
      this.mediaProvider.setTag(this.mediaProvider.meetupTag, response['file_id']).subscribe(response => {
        console.log(response);
        this.mediaProvider.getUserData().subscribe( response2 => {
          this.mediaProvider.setTag(response2['username'].toLowerCase(),response['file_id']);
        });
        this.mediaProvider.setTag(this.mediaProvider.userImgTag,response['file_id']).subscribe(response => {
          console.log(response);
        });
      });
      setTimeout(() =>
        {
          this.navCtrl.setRoot(TabsPage, {openTab: 1});
          let toast = this.toastCtrl.create({
            message: 'New Image Uploaded!',
            duration: 3000,
            position: 'top'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast')
          });
          toast.present();
        },
        3000);
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
      let toast = this.toastCtrl.create({
        message: error.error.message,
        duration: 3000,
        position: 'top'
      });
      toast.onDidDismiss(() => {
        console.log('Dismissed toast')
      });
      toast.present();
    });
  }

  public dismiss() {
    this.navCtrl.setRoot(TabsPage,{openTab: 1});
  }

  public setFile(evt) {
    console.log(evt.target.files[0]);
    this.file = evt.target.files[0];
  }
}
