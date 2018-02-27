import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Favourites} from "../../interfaces/favourites";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Media} from "../../interfaces/media";

/**
 * Generated class for the SinglefileviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-singlefileview',
  templateUrl: 'singlefileview.html',
})
export class SinglefileviewPage {


  mediaFile: Media = {
    title: '',
    description: '',
    file_id: 0,
    filename: '',
    user_id: 0,
    mime_type: '',
    media_type: '',
    time_added: '',
  };

  url: string;

  /*title: string;
  description: string;
  file_id: number;
  filename: string;
  user_id: number;
  mime_type: string;
  media_type: string;
  time_added: string; */


  favouriteFile: Favourites = {
    favourite_id: 0,
    file_id: 0,
    user_id: 0
  };

  ressuponseTemp: any;
  ressuponseTemp1: any;
  temp: string;
  userIdCounter: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaplayerPage');
    this.mediaProvider.getOneFile(this.navParams.get('mediaplayerid')).subscribe(response => {
      console.log(response + "this is response");
      this.url = this.mediaProvider.uploadUrl + '/' + response['filename'];
      this.ressuponseTemp = response;
      this.mediaFile = this.ressuponseTemp;
      /* this.title = response['title'];
       this.description = response['description'];
       this.time_added = response['time_added'];
       this.user_id = response['user_id'];
       this.file_id = response['file_id']; */
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });

    this.mediaProvider.favouritesByFileId(this.mediaFile.file_id).subscribe(ressu => {

      this.ressuponseTemp1 = ressu;
      this.favouriteFile = this.ressuponseTemp1;
      console.log("THIS FAVOURITES " + this.favouriteFile);

      console.log(ressu + "this is ressu");
      console.log(ressu['this.favouriteFile.user_id']);
      //this.favourites.user_id = ressu['favourites.user_id'];  //users that liked the photo
      //this.favourites.favourite_id = ressu['favourites.favourite_id'];
      //this.favourites.file_id = ressu['favourites.file_id'];
      //console.log("Favourite objects details: " + this.favourites.file_id + " <-- file id + user id-->  " + this.favourites.user_id + " finally favourites --> " + this.favourites.favourite_id);
      //console.log("ressu: " + JSON.stringify(ressu));

      //this.temp = JSON.stringify(ressu);
      //console.log("current temp " + this.temp);
      //this.userIdCounter = (this.temp.match(/user_id/g) || []).length;
      //console.log(this.userIdCounter);
      //this is the same as below.
      this.userIdCounter = Object.keys(ressu).length;

    });

  }

  openImage() {
    this.photoViewer.show(this.url, this.mediaFile.title);
  }

}
