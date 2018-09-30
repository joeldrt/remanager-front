import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './../../../_models/client';
import { ClientService } from './../../../_services/client.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../_services';

@Component({
    selector: 'app-cliente-detalle',
    templateUrl: './cliente-detalle.component.html',
    styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit {

  editing_mode = false;

  cliente_id: string;
  cliente: Client;

  constructor(
    private clienteService: ClientService,
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.cliente_id = this.route.snapshot.params['cliente_id'];
    if (!this.cliente_id) {
      this.toaster.warning('No se especificó el cliente id');
      this.router.navigate(['/clientes']);
      return;
    }
    this.cargarCliente();
  }

  cargarCliente() {
    this.cliente = undefined;
    this.clienteService.find(this.cliente_id).subscribe(
      (response: HttpResponse<Client>) => {
        this.cliente = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.message);
        this.router.navigate(['/clientes']);
      }
    );
  }

  ponerModoEdicion() {
    this.editing_mode = true;
  }

  editarCliente() {
    this.clienteService.editar(this.cliente).subscribe(
      (response: HttpResponse<Client>) => {
        this.cliente = response.body;
        this.editing_mode = false;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.message);
      }
    );
  }

}
