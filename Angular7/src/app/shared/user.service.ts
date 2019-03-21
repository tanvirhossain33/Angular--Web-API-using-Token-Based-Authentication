import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Response } from '@angular/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:54105';

  constructor(private http: HttpClient) {

  }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    };
    const requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/api/User/Register', body, { headers: requestHeader });
  }

  userAuthentication(username, password) {
    const data = 'username=' + username + '&password=' + password + '&grant_type=password';
    const requestHeader = new HttpHeaders({ 'Content-Type' : 'application/x-www-urlencoded', 'No-Auth': 'True' });

    return this.http.post(this.rootUrl + '/token', data, {headers: requestHeader});
  }

  getUserClaims() {
    return this.http.get(this.rootUrl + '/api/GetUserClaims');
  }
}
