import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Favourites} from "../../interfaces/favourites";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Media} from "../../interfaces/media";
import {Comments} from "../../interfaces/comments";
import {User} from "../../interfaces/user";

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
    username: ''
  };


  url: string;
  comment: Comments[];
  filzu_id: number;
  favouriteID: Favourites[];
  favTemp: User;

  ressuponseTemp: any;
  ressuponseTemp1: User;
  temp: string;
  userIdCounter: number;
  commentCounter: number;
  commentGuy: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider, private photoViewer: PhotoViewer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MediaplayerPage');
    this.mediaProvider.getOneFile(this.navParams.get('mediaplayerid')).subscribe(response => {
      console.log(response + "this is response");
      this.url = this.mediaProvider.uploadUrl + '/' + response['filename'];
      this.ressuponseTemp = response;
      this.mediaFile = this.ressuponseTemp;
      console.log("THIS IS THE MEDIAFILE ID PART WORKING SO FAR? ?? " + this.mediaFile.file_id);
      this.filzu_id = response['file_id'];
      /* this.title = response['title'];
       this.description = response['description'];
       this.time_added = response['time_added'];
       this.user_id = response['user_id'];
       this.file_id = response['file_id']; */
      this.mediaProvider.getUserInfo(this.mediaFile.user_id).subscribe((ressu: User) => {
        this.ressuponseTemp1 = ressu;
        this.mediaFile.username = this.ressuponseTemp1.username;
      });


      this.mediaProvider.favouritesByFileId(this.filzu_id).subscribe((ressu: Favourites[]) => {
        this.favouriteID = ressu;
        //this.userIdCounter = (this.temp.match(/user_id/g) || []).length;
        //console.log(this.userIdCounter);
        //this is the same as below.
        this.userIdCounter = Object.keys(ressu).length;
        for (let i = 0; i < this.favouriteID.length; i++) {
          this.mediaProvider.getUserInfo(this.favouriteID[i].user_id).subscribe((ressu: User) => {
            this.favTemp = ressu;
            this.favouriteID[i].username = this.favTemp.username;
          });
        }
      });

      this.mediaProvider.getCommentsByFileId(this.filzu_id).subscribe((resbond: Comments[]) => {
        this.comment = resbond;
        this.commentCounter = Object.keys(resbond).length;
        for (let i = 0; i < this.comment.length; i++) {
          this.mediaProvider.getUserInfo(this.comment[i].user_id).subscribe((ressu: User) => {
            this.commentGuy = ressu;
            this.comment[i].username = this.commentGuy.username;
          });
        }

      });
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });

  }

  openImage() {
    this.photoViewer.show(this.url, this.mediaFile.title);
  }

  addComment() {
    if (this.mediaProvider.newComment != null) {
      this.mediaProvider.addComment(this.filzu_id).subscribe(response => {
        console.log(response);
        this.mediaProvider.newComment = '';
        this.mediaProvider.getCommentsByFileId(this.filzu_id).subscribe((resbond: Comments[]) => {
          this.comment = resbond;
          this.commentCounter = Object.keys(resbond).length;

          for (let i = 0; i < this.comment.length; i++) {
            this.mediaProvider.getUserInfo(this.comment[i].user_id).subscribe((ressu: User) => {
              this.commentGuy = ressu;
              this.comment[i].username = this.commentGuy.username;
            });
          }

        });
      });
    }
  }

  addFavourite() {
    this.mediaProvider.addFavourite(this.filzu_id).subscribe(response => {
      this.mediaProvider.favouritesByFileId(this.filzu_id).subscribe((ressu: Favourites[]) => {
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
    this.mediaProvider.deleteFavouite(this.filzu_id).subscribe(response => {
      this.mediaProvider.favouritesByFileId(this.filzu_id).subscribe((ressu: Favourites[]) => {
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
}
