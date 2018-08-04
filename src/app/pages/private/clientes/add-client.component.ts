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
  }

  saveClient(f: NgForm) {
    this.client.correoVendedor = this.route.snapshot.queryParams['correoVendedor'];
    this.client.organizacionId = this.route.snapshot.queryParams['organizationId'];
    this.client.fechaAlta = new Date(Date.now());

    if (this.client.correoVendedor) {
      this.clientService.create(this.client).subscribe(
        (res: HttpResponse<Client>) => {
          this.client =  res.body;
          this.toasterService.success('Cliente Agregado: ' + this.client.nombre + ' ' + this.client.apellidos);
          f.reset();
          this.router.navigate([this.returnTo]);
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        });
    }// end - if
  }// end - saveClient

}
