import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddlistingComponent } from './addlisting/addlisting.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'add-listing',
    component: AddlistingComponent,
    canActivate: [AuthGuard],
  },
  { path: 'listing/:id', component: ListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
