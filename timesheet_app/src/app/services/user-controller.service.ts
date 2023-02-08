import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  PATH_OF_API = "http://localhost:8081/api/v1";

  constructor(private httpclient: HttpClient, private router: Router) {

  }

  public getUsersOfManager(manager_id: number){
    return this.httpclient.get(this.PATH_OF_API + "/users/manager/" + manager_id)
  }

  public getProjectsOfManager(){
    return this.httpclient.get(this.PATH_OF_API + "/projects")
  }

  public createTask(request: object){
    return this.httpclient.post(this.PATH_OF_API + "/times", request);
  }

  public getTimesOfUser(user_id: string | null){
    return this.httpclient.get(this.PATH_OF_API + "/times/" + user_id)
  }
  
}
