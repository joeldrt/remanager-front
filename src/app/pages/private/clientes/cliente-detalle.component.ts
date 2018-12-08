import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from './../../../_models/client';
import { ClientService } from './../../../_services/client.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../_services';

// Utils
import { DigiallDateUtils } from '../../../_utils';
import { empty } from 'rxjs';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-cliente-detalle',
    templateUrl: './cliente-detalle.component.html',
    styleUrls: ['./cliente-detalle.component.scss']
})
export class ClienteDetalleComponent implements OnInit {

  editing_mode = false;

  cliente_id: string;
  cliente: Client;

  fecha_nacimiento: string;

  constructor(
    private clienteService: ClientService,
    private toaster: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private dateUtils: DigiallDateUtils
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
        if (this.cliente && this.cliente.fechaNacimiento) {
          this.fecha_nacimiento = this.cliente.fechaNacimiento.toLocaleString().split('T')[0];
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.error.message);
        this.router.navigate(['../']);
      }
    );
  }

  ponerModoEdicion() {
    this.editing_mode = true;
  }

  editarCliente() {
    this.asignarFechaNacimiento();
    this.clienteService.editar(this.cliente).subscribe(
      (response: HttpResponse<Client>) => {
        this.cliente = response.body;
        if (this.cliente && this.cliente.fechaNacimiento) {
          this.fecha_nacimiento = this.cliente.fechaNacimiento.toLocaleString().split('T')[0];
        }
        this.editing_mode = false;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  borrarCliente() {
    this.clienteService.borrar(this.cliente.id).subscribe(
      (response: HttpResponse<any>) => {
        this.toaster.success('cliente borrado');
        this.editing_mode = false;
        this.router.navigate(['/clientes']);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  asignarFechaNacimiento() {
    if (this.fecha_nacimiento === '') {
      this.cliente.fechaNacimiento = new Date(1876, 0, 17, 0, 0, 0, 0);
      return;
    }
    const fecha_usar = this.dateUtils.toDate(this.fecha_nacimiento);
    this.cliente.fechaNacimiento = new Date(fecha_usar.getUTCFullYear(),
                                            fecha_usar.getUTCMonth(),
                                            fecha_usar.getUTCDate(),
                                            0, 0, 0, 0);
  }

}
