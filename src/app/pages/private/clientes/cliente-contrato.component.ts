import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../_services';

import { Producto } from '../../../_models/producto';
import { Contrato, TipoContrato, ResumenContrato } from '../../../_models/contrato';
import { Client, ResumenContratosPorCliente } from '../../../_models/client';
import { ClientService } from '../../../_services';

import { DigiallDateUtils } from '../../../_utils/';

@Component({
  selector: 'app-cliente-contrato',
  templateUrl: './cliente-contrato.component.html',
  styleUrls: ['./cliente-contrato.component.scss']
})
export class ClienteContratoComponent implements OnInit {

  cliente_id: string;
  resumen_contratos_por_cliente: ResumenContratosPorCliente;

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
    this.cargarClienteResumenContratos();
  }

  cargarClienteResumenContratos() {
    this.clienteService.obtenerResumenContratosPorCliente(this.cliente_id).subscribe(
      (response: HttpResponse<ResumenContratosPorCliente>) => {
        this.resumen_contratos_por_cliente = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ' mensaje: ' + error.message);
        this.router.navigate(['/clientes']);
      }
    );
  }

  colorTarjetaPorTipoDeContrato(tipo: string) {
    switch (tipo) {
      case TipoContrato.BLOQUEO: {
        return 'bg-gray';
      }
      case TipoContrato.APARTADO: {
        return 'bg-yellow';
      }
      case TipoContrato.VENTA: {
        return 'bg-green';
      }
      case TipoContrato.DEVOLUCION: {
        return 'bg-black';
      }
      case TipoContrato.CORRIDA: {
        return 'bg-aqua';
      }
    }
  }

  calcularFechaVencimiento(contrato: Contrato): Date {
    const fecha_creacion = this.dateUtils.toDate(contrato.fechaCreacion);
    const fecha_vencimiento = new Date(+fecha_creacion);
    const nueva_fecha = fecha_vencimiento.getDate() + contrato.diasValidez;
    fecha_vencimiento.setDate(nueva_fecha);
    return fecha_vencimiento;
  }

}
