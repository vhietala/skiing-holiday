import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Camera, CameraOptions} from "@ionic-native/camera";

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
            this.uploadProfileImg();
          }
        }, {
          text: 'delete current image',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
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

  uploadProfileImg() {

    const formData: FormData = new FormData();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let contentType = 'image/png';
      let blob = this.b64toBlob(base64Image, contentType);
      formData.append("blob",blob);
      this.mediaProvider.uploading(formData).subscribe(response => {
        console.log(response);
        this.mediaProvider.setTag(this.mediaProvider.profileimgTag, response["file_id"]).subscribe(response => {
          console.log(response);
        }, (error:HttpErrorResponse) => {
          console.log(error.error.message);
        });
      })
    }, (err) => {
      // Handle error
    });
  }

  private b64toBlob(b64Data, contentType='', sliceSize=512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
}

//load images (user id)

