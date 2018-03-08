import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../interfaces/user";


@Injectable()
export class MediaProvider {

  logged = false;
  meetupTag = 'shmu';
  profileimgTag = 'shmuprofile';
  activityTag = 'shmuactivity';
  meetingTag = 'shmumeeting';

  newComment: '';

  loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
  apiUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media/';
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  favouriteUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';

  tokenSettings = {
    headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
  };


  constructor(public http: HttpClient) {

  }

  public getUserData() {
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
    return this.http.get<User>(this.apiUrl + 'users/user', {headers: headers});
  }

  public removeUserData() {
    localStorage.removeItem('token');
  }

  public getNewFiles() {
    return this.http.get(this.mediaUrl, this.tokenSettings);
  }

  public getOneFile(id) {
    return this.http.get<Array<string>>(this.mediaUrl + id, this.tokenSettings);
  }

  public register(user) {
    return this.http.post(this.apiUrl + 'users', user);
  }

  public login(user) {
    const xsettings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post(this.loginUrl, user, xsettings);
  }

  public uploading(file) {
    return this.http.post(this.mediaUrl, file, this.tokenSettings);
  }

  public favouritesByFileId(id: number) {
    return this.http.get(this.favouriteUrl + 'file/' + id);
  }

  public getCommentsByFileId(id: number) {
    return this.http.get(this.apiUrl + 'comments/file/' + id)
  }

  public addComment(id: number) {
    const body = {
      file_id: id,
      comment: this.newComment,
    };
    return this.http.post(this.apiUrl + 'comments', body, this.tokenSettings);
  }

  public getUserInfo(id: number) {
    return this.http.get(this.apiUrl + 'users/' + id, this.tokenSettings);
  }

  public getByTag(tag: string) {
    return this.http.get(this.apiUrl + 'tags/' + tag);
  }

  public setTag(tag: string, id: number) {
    const body = {
      file_id: id,
      tag: tag
    };
    return this.http.post( this.apiUrl + 'tags', body, this.tokenSettings );
  }

  public addFavourite(id: number) {
    const body = {
      file_id: id
    };
    return this.http.post(this.favouriteUrl, body, this.tokenSettings);
  }

  public deleteFavouite(id: number) {
    return this.http.delete(this.favouriteUrl + 'file/' + id, this.tokenSettings);
  }

  public deleteFile(id:number){
    return this.http.delete(this.apiUrl+' media/' + id,this.tokenSettings);
  }

  public getFavourites(){
    return this.http.get(this.favouriteUrl + '', this.tokenSettings);
  }

}

