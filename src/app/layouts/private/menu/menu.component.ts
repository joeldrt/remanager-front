import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

// API_URL
import { environment } from '../../../../environments/environment';

// servicios
import {
  AuthenticationService,
  AccountService,
  UserExtraService,
} from '../../../_services';

// modelos
import {
  User,
  UserExtra,
} from '../../../_models';

// helpers
import {
  ProfileHelper,
} from '../../../_helpers';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: User;
  isNavbarCollapsed: boolean;

  public userExtra: UserExtra;

  public api_url = environment.API_URL;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private profileHelper: ProfileHelper,
    private userExtraService: UserExtraService,
  ) { }

  ngOnInit() {
    this.profileHelper.getProfileRequest().subscribe(userId => {
      this.getAccount();
      this.getUserExtra();
    });
    this.getAccount();
    this.getUserExtra();
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
        console.log('status: ' + error.status + ' message: ' + error.error.message);
      });
  }

  getUserExtra() {
    this.userExtraService.getUserExtra().subscribe(
      (response: HttpResponse<UserExtra>) => {
        if (response && response.body) {
          this.userExtra = response.body;
        }
      },
      (error: HttpErrorResponse) => {}
    );
  }

  hasAuthority(authority: string): boolean {
    return this.accountService.hasAuthority(authority);
  }

}
