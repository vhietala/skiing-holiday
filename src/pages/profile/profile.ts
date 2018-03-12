import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, ModalController, NavController,
  NavParams
} from 'ionic-angular';
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
              public alertCtrl: AlertController, public mediaProvider: MediaProvider, public actionSheetCtrl: ActionSheetController,
              private camera: Camera) {

    this.pushActivity = ActivityPage;
  }

  favourites: any;
  activities: any = [];
  meetups: any = [];
  tagListActivity: any;
  tagListMeetup: any;
  uploadedFiles: any = [];
  profileName = '';
  profilePicture: string;
  profilePictureID: number;
  userId: number;
  file: File;
  activity: Media;
  meetup: Media;
  profileDescription: string;
  profileImgFile: string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
      this.userId = response['user_id'];
      this.displayFavActivities();
      this.displayFavMeetups();
      this.getUserImages();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }

  modalActivity(id) {
    let modal = this.modalCtrl.create(ActivityPage, {activityId: id});
    modal.present();
  }

  modalMeetup(id) {
    let modal = this.modalCtrl.create(SinglefileviewPage, {mediaplayerid: id});
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

  uploadProfileImg() {

    const formData: FormData = new FormData();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };


    this.camera.getPicture(options).then((imageData) => {

      this.profileImgFile = 'data:image/jpeg;base64,' + imageData;
      formData.append('title', 'profile pic');
      formData.append('description', this.profileDescription);
      formData.append('file', this.dataURItoBlob(this.file));
      this.mediaProvider.uploading(formData).subscribe(response => {
        console.log(response);
        this.deleteProfilePicture();
        this.profilePictureID = response['file_id'];
        this.mediaProvider.getOneFile(this.profilePictureID).subscribe(response7 => {
          this.profilePicture = this.mediaProvider.mediaUrl + response7['filename'];
        }, (error: HttpErrorResponse) => {
          console.log(error.error.message);
        });
        this.mediaProvider.setTag(this.mediaProvider.profileimgTag, response['file_id']).subscribe(response2 => {
          console.log(response2);
          this.profilePictureID = response2['file_id'];
        }, (error4: HttpErrorResponse) => {
        });
      }, (error: HttpErrorResponse) => {
        console.log(error.error.message);
      });
      setTimeout(() => {
          this.navCtrl.setRoot(ProfilePage);
        },
        3000);

    }, (err) => {
      console.log("photo error");
    });

  }

  deleteProfilePicture() {
    this.mediaProvider.deleteFile(this.profilePictureID).subscribe(response => {
      console.log("current profile pic deleted");
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  editDescription() {
    let prompt = this.alertCtrl.create({
      title: 'Profile description',
      message: "Enter here your new profile description",
      inputs: [
        {
          name: 'description',
          placeholder: 'Description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Save clicked');
            this.mediaProvider.editDescription(this.profilePictureID, data['description']).subscribe(response => {
              console.log(response['description']);
              this.profileDescription = response['description'];
              setTimeout(() => {
                  this.navCtrl.setRoot(ProfilePage);
                },
                3000);
            })
          }
        }
      ]
    });
    prompt.present();


  }

  dataURItoBlob(dataURI) {
    // console.log(dataURI);
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
  }


  displayFavActivities() {
    this.mediaProvider.getByTag(this.mediaProvider.activityTag).subscribe(response => {
      //console.log(response);
      this.tagListActivity = response;
      this.mediaProvider.getFavourites().subscribe(response2 => {
        //console.log(response2);
        this.favourites = response2;
        for (let i = 0; i < this.favourites.length; i++) {
          //console.log(this.favourites[i]);
          for (let j = 0; j < this.tagListActivity.length; j++) {
            //console.log(this.tagList[j]);
            if (this.favourites[i].file_id === this.tagListActivity[j].file_id) {
              //console.log(this.tagList[j]);
              this.activities.push(this.tagListActivity[j]);
            } else {

            }
          }
        }
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  displayFavMeetups() {
    this.mediaProvider.getByTag(this.mediaProvider.meetingTag).subscribe(response => {
      //console.log(response);
      this.tagListMeetup = response;
      this.mediaProvider.getFavourites().subscribe(response2 => {
        //console.log(response2);
        this.favourites = response2;
        for (let i = 0; i < this.favourites.length; i++) {
          //console.log(this.favourites[i]);
          for (let j = 0; j < this.tagListMeetup.length; j++) {
            //console.log(this.tagList[j]);
            if (this.favourites[i].file_id === this.tagListMeetup[j].file_id) {
              //console.log(this.tagList[j]);
              this.meetups.push(this.tagListMeetup[j]);
            } else {

            }
          }
        }
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error.message);
    });
  }

  public getUserImages() {
    this.mediaProvider.getUsersMedia().subscribe(response => {
      console.log(response);
      this.uploadedFiles = response;
      this.uploadedFiles.reverse();
    });
  }

  openOneFile(id) {
    this.navCtrl.push(SinglefileviewPage, {mediaplayerid: id});
  }
}
