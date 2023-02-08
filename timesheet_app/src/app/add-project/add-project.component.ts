import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserControllerService } from '../services/user-controller.service';
import { UserAuthService } from '../services/user-auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  createProjectForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private userControllerService: UserControllerService, private userAuthService:UserAuthService, private _snackBar: MatSnackBar){

  }

  createProject(){
    let userID = this.userAuthService.getId();
    let username = this.userAuthService.getUsername();
    const userObject = {userID}
    let request = {
      "title": this.createProjectForm.value.title,
      "description": this.createProjectForm.value.description,
      "manager": userObject
    }

    console.log(request);
    
    this.userControllerService.createProject(username, request).subscribe((response:any) => {
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
      this.createProjectForm.reset();
    }
  }

}
