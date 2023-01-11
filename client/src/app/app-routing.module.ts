import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMeComponent } from './about-me/about-me.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { AuthGuard } from './_guards/auth.guard';
import { LoggedInGuard } from './_guards/logged-in.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', 
  component: UsersPageComponent,
  runGuardsAndResolvers:'always',
  canActivate:[AuthGuard],
  },
  {path: 'register', 
  component: RegisterComponent,
  runGuardsAndResolvers:'always',
  canDeactivate: [LoggedInGuard],
  },
  {path: 'about-me', component: AboutMeComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
