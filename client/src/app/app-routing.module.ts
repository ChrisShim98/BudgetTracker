import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetFormComponent } from './budget-form/budget-form.component';
import { BudgetTableComponent } from './budget-table/budget-table.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'budget', component: BudgetFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', 
  component: UsersPageComponent,
  canActivate:[AuthGuard]
  },
  {path: 'register', 
  component: RegisterComponent,
  canActivate: [LoggedInGuard]
  },
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
