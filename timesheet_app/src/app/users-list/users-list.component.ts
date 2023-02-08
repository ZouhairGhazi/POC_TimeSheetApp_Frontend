import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserControllerService } from '../services/user-controller.service';
import { UserAuthService } from '../services/user-auth.service';

export interface UserData {
  email: string;
  firstname: string;
  lastname: string;
  id: number;
}


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements AfterViewInit {

  userArray: UserData[] = [];

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'show times'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userAuthService:UserAuthService, private userControllerService: UserControllerService) {

    const fetched_users = this.userControllerService.getUsersOfManager(this.userAuthService.getId());

    fetched_users.forEach((value: any) => {
      value.forEach((elt: any) => {
        this.userArray.push({
            id : elt.userId,
            email: elt.email,
            firstname: elt.firstname,
            lastname: elt.lastname
        });
      })
    });


    console.log(this.userArray);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.userArray);
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
