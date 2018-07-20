import { Component, OnInit } from '@angular/core';
import {User} from '../../../_models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(
  ) { }

  ngOnInit() {
  }

  logout() {
  }

}
