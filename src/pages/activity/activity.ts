import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../interfaces/user";
import {Favourites} from "../../interfaces/favourites";
import {Media} from "../../interfaces/media";

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  mediaFile: Media = {
    title: '',
    description: '',
    file_id: 0,
    filename: '',
    user_id: 0,
    mime_type: '',
    media_type: '',
    time_added: '',
    username: ''
  };

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public toastCtrl:ToastController,
              public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  file_id: number;
  favouriteID: Favourites[];
  userIdCounter: number;
  favTemp: User;
  imgUrl: string;
  ressuponseTemp: any;
  favourited: boolean = false;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
    this.mediaProvider.getOneFile(this.navParams.get('activityId')).subscribe(response => {
      this.file_id = response['file_id']
      this.imgUrl = this.mediaProvider.uploadUrl + response['filename'];
      this.ressuponseTemp = response;
      this.mediaFile = this.ressuponseTemp;
      this.mediaProvider.favouritesByFileId(this.file_id).subscribe((ressu: Favourites[]) => {
        this.favouriteID = ressu;
        this.userIdCounter = Object.keys(ressu).length;
      });
    });
  }

  addFavourite() {
    this.mediaProvider.addFavourite(this.file_id).subscribe(response => {
      this.favourited = true;
      this.mediaProvider.favouritesByFileId(this.file_id).subscribe((ressu: Favourites[]) => {
        this.favouriteID = ressu;
        this.userIdCounter = Object.keys(ressu).length;
        for (let i = 0; i < this.favouriteID.length; i++) {
          this.mediaProvider.getUserInfo(this.favouriteID[i].user_id).subscribe((ressu: User) => {
            this.favTemp = ressu;
            this.favouriteID[i].username = this.favTemp.username;
          });
        }
      });
    });
  }

  deleteFavourite() {
    this.mediaProvider.deleteFavouite(this.file_id).subscribe(response => {
      this.favourited = false;
      this.mediaProvider.favouritesByFileId(this.file_id).subscribe((ressu: Favourites[]) => {
        this.favouriteID = ressu;
        this.userIdCounter = Object.keys(ressu).length;
        for (let i = 0; i < this.favouriteID.length; i++) {
          this.mediaProvider.getUserInfo(this.favouriteID[i].user_id).subscribe((ressu: User) => {
            this.favTemp = ressu;
            this.favouriteID[i].username = this.favTemp.username;
          });
        }
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

