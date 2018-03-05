import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {errorHandler} from "@angular/platform-browser/src/browser";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider,
              public actionSheetCtrl: ActionSheetController, private camera: Camera) {
  }

  profileName = '';
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }

  uploadImgActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'upload-action-sheet',
      buttons: [
        {
          text: 'upload new image',
          role: 'destructive',
          handler: () => {
            console.log('Upload clicked');
            this.camera.getPicture(this.cameraOptions).then((imageData) => {
              console.log(imageData);
            }, (error: HttpErrorResponse) => {
              console.log(error.error.message);
            });
          }
        },{
          text: 'delete current image',
          handler: () => {
            console.log('Delete clicked');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}

//load images (user id)

