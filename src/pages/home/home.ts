import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {HttpErrorResponse} from "@angular/common/http";
import {SinglefileviewPage} from "../singlefileview/singlefileview";
import {Media} from "../../interfaces/media";
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../interfaces/user";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
  }

  files: any;
  //MediaFiles: Media[];
  //file: Media = {
  MediaFiles: any;
  file: Media;
  /* = {
      file_id: 0,
      filename: '',
      title: '',
      description: '',
      user_id: 0,
      media_type: '',
      mime_type: '',
      time_added: '',
      username: ''
    }; */

  meeduska: User;


  ionViewDidLoad() {
    this.mediaProvider.getUserData().subscribe(response => {
      console.log('Welcome ' + response['full_name']);
      this.displayImages();
    }, (error: HttpErrorResponse) => {
      console.log(error);
      this.navCtrl.setRoot(LoginPage);
    });
  }

  displayImages() {

    //this.mediaProvider.getNewFiles().subscribe((response: Media[]) => {
    this.mediaProvider.getByTag(this.mediaProvider.profileimgTag).subscribe(response => { //MUUTA TÄMÄ ENNEN JULKAISUA
      console.log(response);
      this.MediaFiles = response;
      //make this response type media and try through it?
      //atm it shows 20 objects and it doenst go throoguh them even i have for loop

      console.log(this.MediaFiles[0].user_id + "EKAN FILEN USERID");
      for (let i = 0; i < this.MediaFiles.length; i++) {
        console.log(this.MediaFiles[i] + " MEDIAFILES ARR I ");
        this.mediaProvider.getUserInfo(this.MediaFiles[i].user_id).subscribe((ressu: User) => {
          this.meeduska = ressu;
          this.MediaFiles[i].username = this.meeduska.username;
        });
      }
    });
  }

  openOneFile(id) {
    this.navCtrl.push(SinglefileviewPage, {mediaplayerid: id});
  }
}
