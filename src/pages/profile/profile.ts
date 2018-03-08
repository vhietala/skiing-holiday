import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, Platform, Toast} from 'ionic-angular';
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
              public actionSheetCtrl: ActionSheetController, private camera: Camera, public platform: Platform) {
  }

  profileName = '';
  profilePicture: string;
  profilePictureID: number;
  userId = '';
  file: File;
  postthis: string;

  formData: FormData;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
      this.userId = response['user_id'];
      //this.postthis = this.userId;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
    this.postthis = this.profilePicture;

    this.mediaProvider.getByTag(this.mediaProvider.profileimgTag).subscribe(response => {
      //const profilePictures = response['files'];
      console.log(response);
      this.postthis = response['length'];
      this.postthis = response[0]['user_id'];

      if (response['length']>0) {
        //this.postthis=response[0]['user_id'];
          for(let i=0;i<response['length'];i++) {
            if (response[i]['user_id'] == this.userId) {
              this.postthis = "here 2";
              this.profilePicture = this.mediaProvider.uploadUrl + '/' + response[i]['filename'];
              this.profilePictureID = response[i]['file_id'];
            } else {
              //this.postthis = "here3";
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
    this.postthis=this.profilePicture;
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
      //sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {

      console.log('imageData =' + imageData);
      this.file = imageData;
      this.profilePicture=imageData;
      //this.profilePicture=this.file['filename'];
      this.formData.append('file',imageData);
    }, (err) => {
      // Handle error
      //this.presentToast('Error while loading image');
      console.log("photo error");
    });
    //const formData: FormData = new FormData();
    this.formData.append('title', 'profile pic');
    //formData.append('description', '');
    //this.formData.append('file', this.file);
    this.mediaProvider.uploading(this.formData).subscribe(response => {
      console.log(response);
      //console.log(response.file_id);
      //myfileid = response.file_id;
      this.mediaProvider.deleteFile(this.profilePictureID).subscribe(response=>{
        console.log(response);
      });
/*      this.mediaProvider.setTag(this.mediaProvider.meetupTag, response['file_id']).subscribe(response3 => {
        console.log(response3);
      });*/
      this.mediaProvider.setTag(this.mediaProvider.profileimgTag, response['file_id']).subscribe(response2 => {
        console.log(response2);
        this.profilePictureID = response2['file_id'];
      });
      //this.profilePictureID = response['file_id'];
      //this.profilePicture = this.mediaProvider.mediaUrl + response['filename'];
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
    setTimeout(() => {
        this.navCtrl.setRoot(HomePage);
      },
      12000);
  }



}



