import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

// Services
import {ClientService} from '../../../_services';

// Models
import {Client} from '../../../_models/client';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit, AfterViewInit {

  public returnTo: string;
  public client: Client;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {
    this.client = new Client();
    this.returnTo = null;
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['id']) {
      this.returnTo = this.route.snapshot.queryParams['returnTo'];
      this.client.id = this.route.snapshot.queryParams['id'];
    } else {
      this.goBackPage();
    }
  }

  ngAfterViewInit() {
    if (this.client.id) {
      this.clientService.find(this.client.id)
        .subscribe(
          (res: HttpResponse<Client>) => {
            this.client = res.body;
          },
          (res: HttpErrorResponse) => {
            console.log('Error :: ' + res);
          });
    }
  }// end - ngAfterViewInit()

  goBackPage() {
    this.router.navigate(['/clientes']);
  }

}
