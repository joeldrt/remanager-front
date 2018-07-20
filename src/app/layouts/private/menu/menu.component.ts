import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/index';
import { AccountService } from '../../../_services';
import { User } from '../../../_models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user: User;
  isNavbarCollapsed: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('account'));
    if (!this.user) {
      this.accountService.getAccount()
        .subscribe(
          user => {
            this.user = user;
          },
          error => {
            console.log(error);
          });
    }
    this.isNavbarCollapsed = true;
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
