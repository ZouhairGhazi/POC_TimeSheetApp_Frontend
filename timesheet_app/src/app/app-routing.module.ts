import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UsersListComponent } from './users-list/users-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageManagerComponent } from './home-page-manager/home-page-manager.component';
import { UserTimesComponent } from './user-times/user-times.component';

const routes: Routes = [
  {path:'home-page',component:HomePageComponent},
  {path:'login-form',component:LoginFormComponent},
  {path:'users-list',component:UsersListComponent},
  {path:'landing-page',component:LandingPageComponent},
  {path:'home-page-manager',component:HomePageManagerComponent},
  {path:'users/:userId/times/:firstname',component:UserTimesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
