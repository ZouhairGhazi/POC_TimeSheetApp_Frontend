import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserControllerService } from '../services/user-controller.service';
import { UserAuthService } from '../services/user-auth.service';

export interface UserData {
  title: string;
  description: string;
}

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent {

  userArray: UserData[] = [];

  displayedColumns: string[] = ['title', 'description', 'actions'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userAuthService:UserAuthService, private userControllerService: UserControllerService) {

    const fetched_users = this.userControllerService.getProjectsOfManager();

    fetched_users.forEach((value: any) => {
      value.forEach((elt: any) => {
        this.userArray.push({
            title: elt.title,
            description: elt.description,
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