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
  public base64Image: string;
  uplfiles: any;
  uploadedFiles: any;


  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams,
              public mediaProvider: MediaProvider, public actionSheetCtrl: ActionSheetController, private camera: Camera) {

    this.pushActivity = ActivityPage;
  }

  favourites: any;
  activities: any = [];
  meetups: any = [];
  activity: Media;
  tagListActivity: any;
  tagListMeetup: any;
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
      this.displayFavMeetups();
      this.getUserImages();
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
  }

  modalActivity(id) {
    let modal = this.modalCtrl.create(ActivityPage, {mediaId: id});
    modal.present();
  }

  modalMeetup(id) {
    let modal = this.modalCtrl.create(SinglefileviewPage, {mediaId: id});
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


//load images (user id)

