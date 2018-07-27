import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  public returnPath: string;

  constructor(
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.returnPath = params.route;
    });
  }

  ngOnInit() {
  }

}
