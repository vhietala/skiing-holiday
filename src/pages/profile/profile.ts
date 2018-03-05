import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Camera} from "@ionic-native/camera";

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
            console.log(this.camera.)
            const formData: FormData = new FormData();
              formData.append('title', this.media.title);
              formData.append('file', this.file);
              this.mediaProvider.uploading(formData).subscribe(response => {
                console.log(response);
                this.mediaProvider.setTag(this.mediaProvider.profileimgTag, response["file_id"]).subscribe(response => {
                  console.log(response);
                });
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

