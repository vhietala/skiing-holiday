import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ActivityPage} from "../activity/activity";
import {SinglefileviewPage} from "../singlefileview/singlefileview";
import {Media} from "../../interfaces/media";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  pushActivity: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
              public mediaProvider: MediaProvider, public actionSheetCtrl: ActionSheetController, private camera: Camera) {

    this.pushActivity = ActivityPage;
  }

  favourites: any;
  activities: any = [];
  meetups: any = [];
  activity: Media;
  tagList: any;
  meetup: Media;

  profileName = '';
  profilePicture: string;
  profilePictureID: number;
  userId: number;
  file: File;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
      this.userId = response['user_id'];
      this.displayFavActivities();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }

  modalActivity(id) {
    let modal = this.modalCtrl.create(ActivityPage, {activityId: id});
    modal.present();
  }

  modalMeetup() {
    let modal = this.modalCtrl.create(SinglefileviewPage);
    modal.present();
  }

  uploadImgActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'upload-action-sheet',
      buttons: [
        {
          text: 'Take a new Picture',
          role: 'destructive',
          handler: () => {
            console.log('Take image clicked');
            //this.takeProfileImg();
          }
        }, {
          text: 'Choose from gallery',
          role: 'destructive',
          handler: () => {
            console.log('Choose image clicked');
            //this.chooseProfileImg();
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

  /*chooseProfileImg() {
    const formData: FormData = new FormData();
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let contentType = 'image/jpeg';
      let blob = this.b64toBlob(base64Image, contentType);
      let filename = imageData.filename;
      this.file = this.blobToFile(blob, filename);
    }, (err) => {
      console.log(err);
    });
    formData.append('file', this.file);
    formData.append('title', 'profile pic');
    this.mediaProvider.uploading(formData).subscribe(response => {
      console.log(response);
      //console.log(response.file_id);
      //myfileid = response.file_id;
      this.mediaProvider.deleteFile(this.profilePictureID);
      this.mediaProvider.setTag(this.mediaProvider.profileimgTag, response['file_id']).subscribe(response2 => {
        console.log(response2);
      });
      this.profilePictureID = response['file_id'];
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
    setTimeout(() => {
        this.navCtrl.setRoot(TabsPage);
      },
      3500);
  }

  takeProfileImg() {

  }*/

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

  blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

   displayFavActivities() {
    this.mediaProvider.getByTag(this.mediaProvider.activityTag).subscribe( response => {
      console.log(response);
      this.tagList = response;
      this.mediaProvider.getFavourites().subscribe( response2 => {
        console.log(response2);
        this.favourites = response2;
        for (let i = 0; i < this.favourites.length; i++) {
          //console.log(this.favourites[i]);
          for (let j = 0; j < this.tagList.length; j++) {
            //console.log(this.tagList[j]);
            if (this.favourites[i].file_id === this.tagList[j].file_id) {
              console.log(this.tagList[j]);
              this.activities.push(this.tagList[j]);
            } else {

            }
          }
        }
      });
    }, (error:HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  displayFavMeetups() {
    this.mediaProvider.getByTag(this.mediaProvider.meetingTag).subscribe( response => {
      console.log(response);
      this.tagList = response;
      this.mediaProvider.getFavourites().subscribe( response2 => {
        console.log(response2);
        this.favourites = response2;
        for (let i = 0; i < this.favourites.length; i++) {
          //console.log(this.favourites[i]);
          for (let j = 0; j < this.tagList.length; j++) {
            //console.log(this.tagList[j]);
            if (this.favourites[i].file_id === this.tagList[j].file_id) {
              console.log(this.tagList[j]);
              this.meetups.push(this.tagList[j]);
            } else {

            }
          }
        }
      });
    }, (error:HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  emptyActivities() {
    this.mediaProvider.getFavourites().subscribe(response => {
      //console.log(response);
      this.favourites = response;
      this.activities = '';
      for (let data of this.favourites) {
        this.mediaProvider.apiUrl + 'tags/file/' + data['file_id'].tag == this.mediaProvider.activityTag;
      }
    });
  }
}

//load images (user id)

