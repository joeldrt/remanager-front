import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FooterMenuhelper {

  private subject = new Subject<any>();

  public map_buttons: Map<string, FooterButton[]>;

  constructor() {
    this.map_buttons = new Map<string, FooterButton[]>();
  }

  public clearButtons(route: string) {
    this.map_buttons.set(route, null);
    this.sendMenuRequest(route);
  }

  public addButton(route: string, footer_button: FooterButton) {
    let buttons_to_change = this.map_buttons.get(route);
    if (!buttons_to_change) {
      buttons_to_change = new Array<FooterButton>();
    }
    buttons_to_change.push(footer_button);
    this.map_buttons.set(route, buttons_to_change);
  }

  public addButtonFromValues(route: string, button_name: string, button_icon: string, target_url?: string, query_params?: any) {
    if (!query_params) {
      const footer_button = new FooterButton(button_name, button_icon, target_url);
      this.addButton(route, footer_button);
    } else {
      const footer_button = new FooterButton(button_name, button_icon, target_url, query_params);
      this.addButton(route, footer_button);
    }
  }

  public removeButton(route: string, footer_button: FooterButton) {
    let buttons_to_change = this.map_buttons.get(route);
    if (!buttons_to_change) {
      return;
    }
    const index_to_remove = buttons_to_change.indexOf(footer_button);
    if (!index_to_remove || index_to_remove < 0) {
      return;
    }
    buttons_to_change = buttons_to_change.splice(index_to_remove, 1);
  }

  public removeButtonByName(route: string, button_name: string) {
    const buttons_to_change = this.map_buttons.get(route);
    for (const button of buttons_to_change) {
      if (button.button_name === button_name) {
        this.removeButton(route, button);
      }
    }
  }

  public getMenu(route: string): FooterButton[] {
    return this.map_buttons.get(route);
  }

  public getMenuRequest() {
    return this.subject.asObservable();
  }

  public sendMenuRequest(route_asked: string) {
    this.subject.next({ route_asked: route_asked });
  }
}

export class FooterButton {
  constructor(
    public button_name: string,
    public button_icon: string,
    public target_url?: string,
    public query_params?: any
  ) {

  }
}
