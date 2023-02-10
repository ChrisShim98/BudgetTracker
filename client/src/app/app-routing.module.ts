import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard]},
  {path: 'budget', component: BudgetFormComponent, canActivate:[AuthGuard]}, 
  {path: 'allbudgets', component: BudgetTableComponent, canActivate:[AuthGuard]}, 
  {path: 'settings', component: SettingsPageComponent, canActivate:[AuthGuard]}, 
  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
