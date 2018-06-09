import { Component, OnInit } from '@angular/core';
import { LayoutContentHeaderService } from './layout_content-header.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.css']
})
export class ContentHeaderComponent implements OnInit {

  constructor(
    public contentHeader: LayoutContentHeaderService,
  ) { }

  ngOnInit() {
  }

}
