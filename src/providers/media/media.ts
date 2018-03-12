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
  userImgTag = 'shmuimageuser'

  newComment: '';
  searchText: '';

  loginUrl = 'http://media.mw.metropolia.fi/wbma/login/';
  apiUrl = 'http://media.mw.metropolia.fi/wbma/';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/media/';
  uploadUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  favouriteUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';


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
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.mediaUrl, tokenSettings);
  }

  public getOneFile(id) {
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get<Array<string>>(this.mediaUrl + id, tokenSettings);
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
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.post(this.mediaUrl, file, tokenSettings);
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
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.post(this.apiUrl + 'comments', body, tokenSettings);
  }

  public getUserInfo(id: number) {
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.apiUrl + 'users/' + id, tokenSettings);
  }

  public getByTag(tag: string) {
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.apiUrl + 'tags/' + tag, tokenSettings);
  }

  public getTagByFileId(id: number) {
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.apiUrl + 'tags/file/' + id, tokenSettings);
  }

  public setTag(tag: string, id: number) {
    const body = {
      file_id: id,
      tag: tag
    };
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.post( this.apiUrl + 'tags', body, tokenSettings );
  }

  public addFavourite(id: number) {
    const body = {
      file_id: id
    };
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.post(this.favouriteUrl,body, tokenSettings);
  }

  public deleteFavouite(id: number) {
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.delete(this.favouriteUrl + 'file/' + id, tokenSettings);
  }

  public deleteFile(id:number){
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.delete(this.apiUrl+' media/' + id, tokenSettings);
  }

  public getFavourites(){
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.favouriteUrl, tokenSettings);
  }

  public searchImages() {
    const body = {
      title: this.searchText,
      description: this.searchText
    };
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.post(this.mediaUrl + 'search', body, tokenSettings);
  }

  public getUsersMedia() {
    const tokenSettings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    return this.http.get(this.mediaUrl + 'user', tokenSettings);
  }
}

