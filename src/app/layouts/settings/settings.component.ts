import { Component, OnInit } from '@angular/core';
import { LayoutSettingsService } from './layout_settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    public settings: LayoutSettingsService,
  ) { }

  ngOnInit() {
  }

}
