import { Component, OnInit } from '@angular/core';
import { Client } from './../../../_models/client';
import { ClientService } from './../../../_services/client.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../_services';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  lista_completa_clientes: Client[];
  clientes: Client[];

  cliente_nuevo: Client;

  constructor(
    private clienteService: ClientService,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.cliente_nuevo = new Client();
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientes = undefined;
    this.clienteService.searchByCv().subscribe(
      (response: HttpResponse<Client[]>) => {
        this.lista_completa_clientes = response.body;
        this.buscar(undefined);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.message);
      }
    );
  }

  agregarCliente() {
    this.clienteService.create(this.cliente_nuevo).subscribe(
      (response: HttpResponse<Client>) => {
        this.cliente_nuevo = new Client();
        this.cargarClientes();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.message);
      }
    );
  }

  buscar(busqueda: string) {
    this.clientes = new Array<Client>();
    if (!busqueda) {
      this.clientes = this.lista_completa_clientes;
      return;
    }
    for (const cliente of this.lista_completa_clientes) {
      let nombre_apellido = cliente.nombre + ' ' + cliente.apellidos;
      nombre_apellido = nombre_apellido.toLowerCase();
      if (nombre_apellido.includes(busqueda.toLowerCase())) {
        this.clientes.push(cliente);
      }
    }
  }

}
