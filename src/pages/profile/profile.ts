import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {HomePage} from "../home/home";

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
  profilePicture: string;
  profilePictureID: number;
  userId = '';
  file: File;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
      this.userId = response['user_id'];
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
    this.mediaProvider.getByTag(this.mediaProvider.profileimgTag).subscribe(response => {
      const profilePictures = response['files'];
      console.log(response);
      if (response['length'] > 0) {

        for (let picture in profilePictures) {
          if (picture['user_id'] == this.userId) {
            this.profilePicture = this.mediaProvider.mediaUrl + picture['filename'];
            this.profilePictureID = picture['file_id']
          } else {
            this.profilePicture = "./assets/imgs/profileimg.png";
          }
        }
      } else {
        this.profilePicture = "./assets/imgs/profileimg.png";
      }
      console.log('profilepic =' + this.profilePicture);
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

//        const formData: FormData = new FormData();
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
      //formData.append("blob", blob);
      this.file= new File(blob[0],'profilePic.png',null);

    }, (err) => {
      // Handle error
    });
    const formData: FormData = new FormData();
    formData.append('title', 'profile pic');
    formData.append('description', '');
    formData.append('file', this.file );
    this.mediaProvider.uploading(formData).subscribe(response => {
      console.log(response);
      //console.log(response.file_id);
      //myfileid = response.file_id;
      this.mediaProvider.deleteFile(this.profilePictureID);
      this.mediaProvider.setTag(this.mediaProvider.profileimgTag, response['file_id']).subscribe(response2 => {
        console.log(response2);
      });
      this.profilePictureID=response['file_id'];
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
    setTimeout(() => {
        this.navCtrl.setRoot(HomePage);
      },
      3500);
  }

  private b64toBlob(b64Data, contentType = '', sliceSize = 512) {
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

