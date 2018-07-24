import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/index';
import { AccountService } from '../../../_services';
import { User } from '../../../_models';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

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
    this.getAccount();
    this.isNavbarCollapsed = true;
  }

  collapseNavbar() {
    this.isNavbarCollapsed = true;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  getAccount() {
    this.accountService.getAccount().subscribe(
      (response: HttpResponse<User>) => {
        this.user = response.body;
      },
      (error: HttpErrorResponse) => {
        console.log('Error: ' + error.message);
      });
  }

}
