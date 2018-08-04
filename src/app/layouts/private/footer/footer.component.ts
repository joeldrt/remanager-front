import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { FooterButton } from '../../../_helpers/footer-menuhelper';
import { FooterMenuhelper } from '../../../_helpers/footer-menuhelper';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public buttons: FooterButton[];

  constructor(
    private router: Router,
    private menuHelper: FooterMenuhelper,
  ) {
    /*router.events.subscribe(
      value => {
        if (value instanceof NavigationEnd) {
          this.refreshCurrentButtons();
        }
      }
    );*/
    this.menuHelper.getMenuRequest().subscribe(message => {
      this.buttons = this.menuHelper.getMenu(message.route_asked);
    });
  }

  ngOnInit() {
  }

  private refreshCurrentButtons() {
    this.buttons = this.menuHelper.getMenu(this.router.url.split('?', 2)[0]);
  }

  obtainClassForButtons(): string {
    const columSpace = (12 / this.buttons.length);
    return 'col-xs-' + columSpace + ' col-sm-' + columSpace + ' col-md-' + columSpace + ' text-center';
  }

}
