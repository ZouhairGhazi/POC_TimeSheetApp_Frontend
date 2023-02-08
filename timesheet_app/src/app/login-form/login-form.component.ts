import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit {

  showText: Boolean = false;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private userService:UserService, private userAuthService:UserAuthService, private router: Router) {

  }

  ngOnInit() {
    
  }

  login() {

    this.userService.login(this.loginForm.value).subscribe((response:any) => {

      this.userAuthService.setToken(response.authenticationToken);
      this.userService.info(response.authenticationToken, response.username).subscribe((info_response:any) => {
        
        this.userAuthService.setId(info_response.userId);
        this.userAuthService.setRole(info_response.role.id);
        this.userAuthService.setUsername(info_response.username);
        this.userAuthService.setFirstname(info_response.firstname);
        if (this.userAuthService.getRole() === 1){
          this.router.navigate(['/home-page']);
        }
  
        else if (this.userAuthService.getRole() === 2){
          this.router.navigate(['/home-page-manager']);
        }
  
        else {
          this.router.navigate(['/home-page']);
        }
      },
      (error)=>{
        console.log(error);
        this.router.navigate(['/error-page']);
        //add error message here
      })
  
    },
    (error)=>{
      console.log(error);
      this.showText = true;
      this.router.navigate(['/login-form']);
      //add error message here
    }
    )
  
  }
}

