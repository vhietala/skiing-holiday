import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../interfaces/user";
import {tokenKey} from "@angular/core/src/view";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  logged = false;

  newComment: '';

  loginUrl = 'http://media.mw.metropolia.fi/wbma/login';
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media';
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  favouriteUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';

  tokenSettings = {
    headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
  };


  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  public getUserData() {
    const headers = new HttpHeaders().set('x-access-token', localStorage.getItem('token'));
    return this.http.get<User>(this.apiUrl + '/users/user', {headers: headers});
  }

  public static removeUserData() {
    localStorage.removeItem('token');
  }

  public getNewFiles() {
    return this.http.get(this.mediaUrl, this.tokenSettings);
  }

  public getOneFile(id) {
    return this.http.get<Array<string>>(this.mediaUrl + '/' + id, this.tokenSettings);
  }

  public register(user) {
    return this.http.post(this.apiUrl + '/users', user);
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
    return this.http.get(this.apiUrl + '/comments/file/' + id)
  }

  public addComment(id: number) {
    const body = {
      file_id: id,
      comment: this.newComment,
    };
    return this.http.post(this.apiUrl + '/comments', body, this.tokenSettings);
  }

  public getUserInfo(id: number) {
    return this.http.get(this.apiUrl + '/users/' + id, this.tokenSettings);
  }
}

