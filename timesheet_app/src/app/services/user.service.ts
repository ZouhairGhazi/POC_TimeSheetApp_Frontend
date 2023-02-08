import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  PATH_OF_API = "http://localhost:8081/api/auth";

  requestHeader = new HttpHeaders(
    { "noauth": "true" }
  );

  constructor(private httpclient: HttpClient, private userAuthService:UserAuthService, private router: Router) {

  }
  
  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + "/login", loginData, { headers: this.requestHeader })
  }

  public info(token: String, username: String) {
    return this.httpclient.get(this.PATH_OF_API + "/info/" + username)
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/landing-page']);
  }
}
