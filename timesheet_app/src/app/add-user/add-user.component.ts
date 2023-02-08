import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserControllerService } from '../services/user-controller.service';
import { UserAuthService } from '../services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  createUserForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private userControllerService: UserControllerService, private userAuthService:UserAuthService, private _snackBar: MatSnackBar){

  }

  createUser(){
    let userID = this.userAuthService.getId();
    let request = {
      "username": this.createUserForm.value.username,
      "firstname": this.createUserForm.value.firstname,
      "lastname": this.createUserForm.value.lastname,
      "email": this.createUserForm.value.email,
      "password": this.createUserForm.value.password,
      "roleId": 1,
      "managerId": userID,

    }

    console.log(request);
    
    this.userControllerService.createUser(userID, request).subscribe((response:any) => {
      
      this.openSnackBar(response);
    },
    (error)=>{
      console.log(error);
      //this.router.navigate(['/landing-page']);
      //add error message here
    })
  }

  openSnackBar(response: any){
    if (response){
      this._snackBar.open("User successfully created !", "Nice !");
      this.createUserForm.reset();
    }
  }

}
