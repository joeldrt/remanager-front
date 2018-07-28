import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  public returnTo: string;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    debugger
    this.returnTo = this.route.snapshot.queryParams['returnTo'];
  }

}
