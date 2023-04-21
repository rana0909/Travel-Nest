import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchText = '';
  showDropdown = false;
  isLoggedIn = false;
  loggedUsername = '';

  constructor(
    protected router: Router,
    private auth: AuthService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.auth.isLoggedIn$.subscribe((res) => {
      this.isLoggedIn = res;
    });
    this.auth.username$.subscribe((res) => {
      this.loggedUsername = res;
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/signup']);
  }

  navigateToAddListing() {
    this.router.navigate(['/add-listing']);
  }

  handleLogout() {
    this.showDropdown = false;
    this.auth.logout();
  }

  setShowDropdown(value: boolean) {
    this.showDropdown = value;
  }

  searchHome(event: Event) {
    this.searchText = (<HTMLInputElement>event.target).value;
    console.log(this.searchText);
    this.helperService.filterListings(this.searchText);
  }
}
