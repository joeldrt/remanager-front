import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../_services/index';
import {User} from '../../../_models';
import {AccountService} from '../../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(
    private authenticationService: AuthenticationService,
    private accountService: AccountService,
    private router: Router,
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
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

}
