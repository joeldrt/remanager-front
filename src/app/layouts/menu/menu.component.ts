import { Component, OnInit } from '@angular/core';
import { LayoutMenuService } from './layout_menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    public menu: LayoutMenuService,
  ) { }

  ngOnInit() {
  }

}
