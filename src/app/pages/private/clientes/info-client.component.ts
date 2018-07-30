import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

// Services
import {ClientService} from '../../../_services';
import {HistoricoEstatusProductosService} from '../../../_services';

// Models
import {Client} from '../../../_models/client';
import {HistoricoEstatusProducto} from '../../../_models/historico.estatus.producto';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit, AfterViewInit {

  public returnTo: string;
  public client: Client;
  public historicoProductos: HistoricoEstatusProducto[];

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private historicoService: HistoricoEstatusProductosService
  ) {
    this.client = new Client();
    this.returnTo = '';
  }

  ngOnInit() {
    this.returnTo = this.route.snapshot.queryParams['returnTo'];
    this.client.id = this.route.snapshot.queryParams['id'];
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

      this.historicoService.searchByIdClient(this.client.id)
        .subscribe(
          (res: HttpResponse<HistoricoEstatusProducto[]>) => {
            this.historicoProductos = res.body;
        },
          (res: HttpErrorResponse) => {
            console.log('Error: ' + res.message);
          });

    }
  }// end - ngAfterViewInit()

}
