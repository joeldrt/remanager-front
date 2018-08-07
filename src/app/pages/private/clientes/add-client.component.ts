import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../../_models/client';

import { ClientService, ToasterService } from '../../../_services';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {

  public returnTo: string;
  public client: Client;
  public productId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private toasterService: ToasterService
  ) {
    this.client = new Client();
  }

  ngOnInit() {
    this.returnTo = this.route.snapshot.queryParams['returnTo'];
    if (this.returnTo === '/adquirir') {
      this.productId = this.route.snapshot.queryParams['productId'];
    }
  }

  saveClient(f: NgForm) {
    this.client.correoVendedor = this.route.snapshot.queryParams['correoVendedor'];
    this.client.organizacionId = this.route.snapshot.queryParams['organizationId'];

    if (this.client.correoVendedor) {
      this.clientService.create(this.client).subscribe(
        (res: HttpResponse<Client>) => {
          this.client =  res.body;
          this.toasterService.success(
            'Cliente Agregado: ' + this.client.nombre + ' ' + this.client.apellidos + ' ' + 'id::' + this.client.id);
          f.reset();
          this.returnToPage();
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        });
    }// end - if
  }// end - saveClient

  returnToPage() {
    switch (this.returnTo) {
      case '/clientes':
        console.log('Ir a Clientes');
        break;
      case '/adquirir':
        this.router.navigate(['/adquirir', this.productId], {queryParams: {
            clientId: this.client.id
          }});
        break;
    }
  } // end - returnToPage()

  cancelAddClient() {
    switch (this.returnTo) {
      case '/clientes':
        this.router.navigate(['/clientes']);
        break;
      case '/adquirir':
        this.router.navigate(['/adquirir', this.productId]);
        break;
    }
  } // end - cancelAddClient()
}
