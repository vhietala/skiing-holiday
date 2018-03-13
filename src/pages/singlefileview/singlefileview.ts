import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Favourites} from "../../interfaces/favourites";
import {PhotoViewer} from "@ionic-native/photo-viewer";
import {Media} from "../../interfaces/media";
import {Comments} from "../../interfaces/comments";
import {User} from "../../interfaces/user";
import {TabsPage} from "../tabs/tabs";


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
  favourited: boolean = false;
  userId: number;
  username: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public mediaProvider: MediaProvider, private photoViewer: PhotoViewer, public actionSheetCtrl: ActionSheetController) {
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
      this.mediaProvider.getUserData().subscribe(response => {
        this.userId = response['user_id'];
        this.username = response['username'];
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
            //console.log(i);
            //console.log(this.favouriteID.length);
            //console.log(this.favTemp.username);
            //console.log("OKAY LETS TRY THIS MF FAVOURITING AGAIN : " + this.username + this.favTemp.username);
            if (this.favTemp.username = this.username) {
              this.favourited = true;
            } else {
              this.favourited = false;
            }
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
      this.favourited = true;
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
      this.favourited = false;
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

  dismiss() {
    this.viewCtrl.dismiss();
  }

  deleteMedia() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'upload-action-sheet',
      buttons: [
        {
          text: 'Delete image',
          handler: () => {
            console.log('Delete clicked');
            this.mediaProvider.deleteFile(this.filzu_id).subscribe(response => {
              this.navCtrl.setRoot(TabsPage, {openTab: 1});
            });
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
}
