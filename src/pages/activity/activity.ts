import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../interfaces/user";
import {Favourites} from "../../interfaces/favourites";

@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public toastCtrl:ToastController,
              public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  file_id: number;
  favouriteID: Favourites[];
  userIdCounter: number;
  favTemp: User;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
    this.mediaProvider.getOneFile(this.navParams.get('activityId')).subscribe(response => {
      this.file_id = response['file_id']
    });
  }

  favourite() {
    this.mediaProvider.addFavourite(this.file_id).subscribe(response => {
      this.mediaProvider.favouritesByFileId(this.file_id).subscribe((ressu: Favourites[]) => {
        this.favouriteID = ressu;
        this.userIdCounter = Object.keys(ressu).length;
        for (let i = 0; i < this.favouriteID.length; i++) {
          this.mediaProvider.getUserInfo(this.favouriteID[i].user_id).subscribe((ressu: User) => {
            this.favTemp = ressu;
            this.favouriteID[i].username = this.favTemp.username;
            let toast = this.toastCtrl.create({
              message: 'Favourited',
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
          });
        }
      });
    });
  }

  unFavourite() {
    this.mediaProvider.deleteFavouite(this.file_id).subscribe(response => {
      this.mediaProvider.favouritesByFileId(this.file_id).subscribe((ressu: Favourites[]) => {
        this.favouriteID = ressu;
        this.userIdCounter = Object.keys(ressu).length;
        for (let i = 0; i < this.favouriteID.length; i++) {
          this.mediaProvider.getUserInfo(this.favouriteID[i].user_id).subscribe((ressu: User) => {
            this.favTemp = ressu;
            this.favouriteID[i].username = this.favTemp.username;
            let toast = this.toastCtrl.create({
              message: 'favourite removed',
              duration: 3000,
              position: 'top'
            });
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
            toast.present();
          });
        }
      });
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}

