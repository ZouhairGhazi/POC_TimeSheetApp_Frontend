import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() {

  }

  public setId(id: number){
    localStorage.setItem("id",JSON.stringify(id));
  }
  public getId():number{
    return JSON.parse(localStorage.getItem("id")!);
  }
  public setRole(role: number){
    localStorage.setItem("role",JSON.stringify(role));
  }
  public getRole():number{
    return JSON.parse(localStorage.getItem("role")!);
  }
  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken",jwtToken);
  }
  public getToken():string {
    return localStorage.getItem('jwtToken')!;
  }
  public setUsername(username:string){
    localStorage.setItem("username",username);
  }
  public getUsername():string{
    return localStorage.getItem("username")!;
  }

  public setFirstname(firstname:string){
    localStorage.setItem("firstname",firstname);
  }
  public getFirstname():string{
    return localStorage.getItem("firstname")!;
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn() : Boolean{
    return this.getToken() != null;
  }

}
