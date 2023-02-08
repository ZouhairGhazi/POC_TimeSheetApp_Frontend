import { Component } from '@angular/core';
import { UserAuthService } from './services/user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timesheet_app';

  constructor(public userAuthService:UserAuthService) {
    
  }
}
