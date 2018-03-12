import {Component} from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform,
  Toast
} from 'ionic-angular';
import {HttpErrorResponse} from "@angular/common/http";
import {MediaProvider} from "../../providers/media/media";
import {Camera, CameraOptions} from "@ionic-native/camera";


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider,
              public actionSheetCtrl: ActionSheetController, private camera: Camera, public platform: Platform, public alertCtrl: AlertController) {
  }

  profileName = '';
  profilePicture: string;
  profilePictureID: number;
  userId = '';
  file: string;
  postthis: string;
  profileDescription: string;

  //formData: FormData;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.mediaProvider.getUserData().subscribe(response => {
      this.profileName = response['username'];
      this.userId = response['user_id'];
    }, (error: HttpErrorResponse) => {
      console.log(error);
    });
    this.postthis = this.profilePicture;

    this.mediaProvider.getByTag(this.mediaProvider.profileimgTag).subscribe(response => {
      console.log(response);

      if (response['length'] > 0) {
        for (let i = 0; i < response['length']; i++) {
          if (response[i]['user_id'] == this.userId) {
            this.profilePicture = this.mediaProvider.uploadUrl + '/' + response[i]['filename'];
            this.profilePictureID = response[i]['file_id'];
            this.profileDescription = response[i]['description']
          } else {
            //this.postthis = "here3";
            this.profilePicture = "./assets/imgs/profileimg.png";
          }
        }
      } else {
        this.profilePicture = "./assets/imgs/profileimg.png";
      }
      console.log('profilepic =' + this.profilePicture);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    })
    this.postthis = this.profilePicture;
  }

  uploadImgActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      cssClass: 'upload-action-sheet',
      buttons: [
        {
          text: 'upload new image',
          role: 'destructive',
          handler: () => {
            console.log('Upload clicked');
            this.uploadProfileImg();
          }
        }, {
          text: 'delete current image',
          handler: () => {
            console.log('Delete clicked');
            this.deleteProfilePicture();
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

      // console.log('imageData =' + imageData);
      this.file = 'data:image/jpeg;base64,' + imageData;
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
          this.postthis = error4.error.message + '4';
        });
      }, (error: HttpErrorResponse) => {
        this.postthis = error.error.message + '3';
        console.log(error.error.message);
      });

    }, (err) => {
      console.log("photo error");
    });

    setTimeout(() => {
        this.navCtrl.setRoot(ProfilePage);
      },
      3000);
}
deleteProfilePicture(){
    this.mediaProvider.deleteFile(this.profilePictureID).subscribe(response=>{
      console.log("current profile pic deleted");
    },(error:HttpErrorResponse)=>{
      console.log(error.error.message);
    });
}
editDescription()
{
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
          this.postthis = data['description'];
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

dataURItoBlob(dataURI)
{
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
}



