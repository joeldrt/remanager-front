import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutHeaderService } from './layout_header.service';

import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public header: LayoutHeaderService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigateByUrl('/login');
  }

}
