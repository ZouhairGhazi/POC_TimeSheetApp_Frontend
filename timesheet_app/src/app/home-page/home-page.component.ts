import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
    datepicked: FormControl;

    constructor() {
      this.datepicked = new FormControl({});
    }

    ngOnInit() {
      console.log(this.datepicked.value);
    }
}
