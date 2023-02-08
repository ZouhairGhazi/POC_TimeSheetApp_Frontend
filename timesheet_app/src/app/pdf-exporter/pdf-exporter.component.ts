import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';


import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import { UserControllerService } from '../services/user-controller.service';
import { UserAuthService } from '../services/user-auth.service';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-pdf-exporter',
  templateUrl: './pdf-exporter.component.html',
  styleUrls: ['./pdf-exporter.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class PdfExporterComponent {
  
  date = new FormControl(moment());

  formattedDate: string = "";

  constructor(private userAuthService:UserAuthService, private userControllerService: UserControllerService){

  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    if (this.date.value != null){
      this.formattedDate = this.date.value.format('YYYY-MM-DD HH:mm:ss');
    }
    datepicker.close();
  }

  exportPDF(){
    let new_date = this.formattedDate.substring(0, 7)
    this.userControllerService.exportToPdf(this.userAuthService.getId(), new_date).subscribe((response:any) => {
      console.log(response);
      const blob = new Blob([response], { type: 'application/pdf' });
      console.log(blob);
      const fileURL = URL.createObjectURL(blob);
      console.log(fileURL);
      window.open(fileURL);
    },
    (error)=>{
      console.log(error);
      //add error message here
    })
  }
}
