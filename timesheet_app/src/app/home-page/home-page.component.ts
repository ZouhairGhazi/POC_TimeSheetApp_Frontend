import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserControllerService } from '../services/user-controller.service';
import { DatePipe } from '@angular/common';
import { UserAuthService } from '../services/user-auth.service';
import { Router } from '@angular/router';

import {MatSnackBar} from '@angular/material/snack-bar';


interface UserData {
  id: number,
  viewValue: string;
  description: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  userArray: UserData[] = [];

  edit_time: FormGroup = new FormGroup({
    
  });

  selected_project: string = "";

  projects = new FormGroup({
    pickedProject: new FormControl('', [Validators.required])
  });
  
  startGroupHour = new FormGroup({
    pickedStartHour: new FormControl('', [Validators.required])
  });

  startGroupDate = new FormGroup({
    pickedStartDate: new FormControl('', [Validators.required])
  });

  endGroupHour = new FormGroup({
    pickedEndHour: new FormControl('', [Validators.required])
  });

  endGroupDate = new FormGroup({
    pickedEndDate: new FormControl('', [Validators.required])
  });
  
  selectedDate: string[] = [];

  minDate = new Date(2023, 0, 1); 
  maxDate = new Date(2023, 11, 31);

	constructor(private userAuthService: UserAuthService, private userControllerService: UserControllerService, 
    private datePipe: DatePipe, private router: Router, private _snackBar: MatSnackBar) {

    const fetched_users = this.userControllerService.getProjectsOfManager();

    fetched_users.forEach((value: any) => {
      value.forEach((elt: any) => {
        this.userArray.push({
            id: elt.id,
            viewValue: elt.title,
            description: elt.description,
        });
      })
    });

    this.startGroupHour.valueChanges.subscribe(group => {
      if (group.pickedStartHour) {
        let hour = group.pickedStartHour + ":00";
        this.selectedDate.push(hour);
      }
    });
    this.startGroupDate.valueChanges.subscribe(group => {
      if (group.pickedStartDate) {
        let date = group.pickedStartDate;
        let formattedDate = date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null;
        if (typeof formattedDate === 'string') {
          this.selectedDate.push(formattedDate);
        }
      }
    });
    this.endGroupHour.valueChanges.subscribe(group => {
      if (group.pickedEndHour) {
        let hour = group.pickedEndHour + ":00";
        this.selectedDate.push(hour);
      }
    });
    this.endGroupDate.valueChanges.subscribe(group => {
      if (group.pickedEndDate) {
        let date = group.pickedEndDate;
        let formattedDate = date ? this.datePipe.transform(date, 'yyyy-MM-dd') : null;
        if (typeof formattedDate === 'string') {
          this.selectedDate.push(formattedDate);
        }
      }
    });
    this.projects.valueChanges.subscribe(group => {
      if (group.pickedProject) {
        this.selected_project = group.pickedProject;
      }
    });
    
  }

  add_time() {
    let request = {
      "dateStart": "",
      "dateEnd": "",
      "projectId": "",
      "username": ""
    }
    request.dateStart = this.selectedDate[2] + "T" + this.selectedDate[0];
    request.dateEnd = this.selectedDate[3] + "T" + this.selectedDate[1];
    this.userArray.forEach((elt: any) =>{
      if (elt.viewValue == this.selected_project)
        request.projectId = elt.id;
    })
    request.username = this.userAuthService.getUsername();
    this.userControllerService.createTask(request).subscribe((response:any) => {
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
      this._snackBar.open("Task successfully created !", "Nice !");
      this.router.navigate(['/home-page']);
    }
  }

}
