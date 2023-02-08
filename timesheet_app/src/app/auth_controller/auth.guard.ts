import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService:UserAuthService,private router:Router,private userService:UserService){

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    /*if(this.userAuthService.getToken()!=null){
      const role = route.data["roles"] as Array<string>;
      if(role){
        console.log(role);
        const match = this.userService.roleMatch(role);
        console.log(role);
        if(match){
          return true;
        }
        else {
          //this.router.navigate(['/forbiden']);
          return false;
        }
      }
    }*/
    this.router.navigate(['/login-form']);
    return false;
      
    }
  
}
