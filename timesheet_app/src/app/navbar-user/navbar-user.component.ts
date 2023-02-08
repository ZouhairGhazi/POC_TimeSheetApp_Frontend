import { Component } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent {

  constructor(public userService:UserService, public userAuthService:UserAuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.userService.logout();
  }
  
}
