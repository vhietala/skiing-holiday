import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from "../../interfaces/user";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  logged = false;

  loginUrl = 'http://media.mw.metropolia.fi/wbma/login';
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media';
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  favouriteUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';


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
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token'))
    };
    return this.http.get(this.mediaUrl, settings);
  }

  public getOneFile(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token',
        localStorage.getItem('token'))
    };
    return this.http.get<Array<string>>(this.mediaUrl + '/' + id, settings);
  }

  public register(user) {
    return this.http.post(this.apiUrl + '/users', user);
  }

  public login(user) {
    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    return this.http.post(this.loginUrl, user, settings);
  }

  public uploading(file) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token')),
    };
    return this.http.post(this.mediaUrl, file, settings);
  }

  public favouritesByFileId(id:number) {
    return this.http.get(this.favouriteUrl + 'file/' + id);
  }

  public getCommentsByFileId(id:number) {
    return this.http.get(this.mediaUrl + '/comments/file/' + id)
  }
}

