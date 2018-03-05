import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  profileName = '';
  profilePicture = '';

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
    this.mediaProvider.getByTag(this.mediaProvider.profileimgTag).subscribe(response => {
      const profilePictures = response['files'];
      for (let i=0;i<profilePictures.length;i++){
        let userId = '';
        this.mediaProvider.getUserData().subscribe(response=>{
          userId=response['user_id'];
        });
        if (profilePictures[i]['user_id']== userId){
          this.profilePicture=profilePictures[i];
        }
      }
    })
  }
}

//load images (user id)

