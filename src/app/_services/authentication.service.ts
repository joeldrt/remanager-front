import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LayoutHeaderService } from '../layouts/header/layout_header.service';
import { LayoutMenuService } from '../layouts/menu/layout_menu.service';
import { LayoutContentHeaderService } from '../layouts/content-header/layout_content-header.service';
import { LayoutFooterService } from '../layouts/footer/layout_footer.service';
import { LayoutSettingsService } from '../layouts/settings/layout_settings.service';

@Injectable()
export class AuthenticationService {
    constructor(
      private http: HttpClient,
      private layoutHeaderService: LayoutHeaderService,
      private layoutMenuService: LayoutMenuService,
      private layoutContentHeaderService: LayoutContentHeaderService,
      private layoutFooterService: LayoutFooterService,
      private layoutSettingsService: LayoutSettingsService,
    ) { }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:8080/api/authenticate', { username: username, password: password })
            .map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.id_token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                // show layout components
              this.showLayoutComponents();

                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        // remove layout components and only show login form
        this.hideLayoutComponents();
    }

    showLayoutComponents() {
      this.layoutHeaderService.show();
      this.layoutMenuService.show();
      this.layoutContentHeaderService.show();
      this.layoutFooterService.show();
      this.layoutSettingsService.show();
    }

    hideLayoutComponents() {
      this.layoutHeaderService.hide();
      this.layoutMenuService.hide();
      this.layoutContentHeaderService.hide();
      this.layoutFooterService.hide();
      this.layoutSettingsService.hide();
    }
}
