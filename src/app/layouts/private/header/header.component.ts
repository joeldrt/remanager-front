import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { filter } from 'rxjs/operators';
import {HeaderHelper} from '../../../_helpers';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pageTitle: string;

  constructor(
    private headerHelper: HeaderHelper,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(
      value => {
        if (value instanceof NavigationEnd) {
          this.clearMenuNavTitle();
        }
      }
    );
    this.headerHelper.getHeaderRequest().subscribe(
      value => {
        if (value && value.headerTitle) {
          this.pageTitle = value.headerTitle;
        } else {
          this.pageTitle = 'Sin Titulo';
        }
      }
    );
  }

  clearMenuNavTitle() {
    this.pageTitle = '';
  }

  logout() {
  }

}
