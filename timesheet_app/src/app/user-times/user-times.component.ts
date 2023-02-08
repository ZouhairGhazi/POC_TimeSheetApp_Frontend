import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { UserControllerService } from "../services/user-controller.service";

export interface TimeData {
  date_start: string;
  date_end: string;
  project: string;
}

@Component({
  selector: 'app-user-times',
  templateUrl: './user-times.component.html',
  styleUrls: ['./user-times.component.css']
})
export class UserTimesComponent {
  userId =  this.route.snapshot.paramMap.get('userId')

  ngOnInit() {
    console.log(this.userId)
  }
  timeArray: TimeData[] = [];

  displayedColumns: string[] = ['Start time', 'End time', 'Project'];
  dataSource: MatTableDataSource<TimeData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private route: ActivatedRoute,private userControllerService: UserControllerService) {

    const fetched_times = this.userControllerService.getTimesOfUser(this.userId);

    fetched_times.forEach((value: any) => {
      value.forEach((elt: any) => {
        let dateStart = elt.dateStart.substring(0, 10);
        let reverseddateStart = dateStart.split('-').reverse().join('-');
        let hourStart = elt.dateStart.substring(11, 16);
        let dateEnd = elt.dateEnd.substring(0, 10);
        let reverseddateEnd = dateEnd.split('-').reverse().join('-');
        let hourEnd = elt.dateEnd.substring(11, 16);
        this.timeArray.push({
          date_start : "[" + hourStart + "] " + " / " + reverseddateStart,
          date_end: "[" + hourEnd + "] " + " / " + reverseddateEnd,
          project: elt.project,
        });
      })
    });


    console.log(this.timeArray);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.timeArray);

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
