import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// Services
import { ProductoService, ClientService, ContratoService, ToasterService } from '../../../_services';

// Models
import { Producto } from '../../../_models';
import { Client } from '../../../_models/client';
import { Contrato, TipoContrato, PagoProgramado } from '../../../_models/contrato';

// Helpers
import { HeaderHelper } from '../../../_helpers';

// Utils
import { DigiallDateUtils } from '../../../_utils';

@Component({
  selector: 'app-contratos-visor',
  templateUrl: './contratos-visor.component.html',
  styleUrls: ['./contratos-visor.component.scss']
})
export class ContratosVisorComponent implements OnInit {

  contrato_id: string;
  contrato: Contrato;
  producto: Producto;
  cliente: Client;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private clientService: ClientService,
    private contratoService: ContratoService,
    private toaster: ToasterService,
    private headerHelper: HeaderHelper,
    private dateUtils: DigiallDateUtils,
  ) { }

  ngOnInit() {
    this.contrato_id = this.route.snapshot.params['contrato_id'];
    if (!this.contrato_id) {
      this.toaster.error('No se especificó el contrato');
      this.router.navigate(['../'], {relativeTo: this.route});
      return;
    }
    this.cargarContrato();
  }

  cargarContrato() {
    this.contratoService.getContractForId(this.contrato_id).subscribe(
      (response: HttpResponse<Contrato>) => {
        this.contrato = response.body;
        this.cargarCliente();
        this.cargarProducto();
        this.headerHelper.sendHeaderTitleRequest('Visor de acción');
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  cargarCliente() {
    this.clientService.find(this.contrato.clienteId).subscribe(
      (response: HttpResponse<Client>) => {
        this.cliente = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  cargarProducto() {
    this.productoService.getProductosById(this.contrato.productoId).subscribe(
      (response: HttpResponse<Producto>) => {
        this.producto = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  calcularFechaVencimiento(contrato: Contrato): Date {
    const fecha_creacion = this.dateUtils.toDate(contrato.fechaCreacion);
    const fecha_vencimiento = new Date(+fecha_creacion);
    const nueva_fecha = fecha_vencimiento.getDate() + contrato.diasValidez;
    fecha_vencimiento.setDate(nueva_fecha);
    const fecha_a_mostrar = new Date(fecha_vencimiento.getUTCFullYear(),
                                     fecha_vencimiento.getUTCMonth(),
                                     fecha_vencimiento.getUTCDate(),
                                     0, 0, 0, 0);
    return fecha_a_mostrar;
  }

  borrarContrato() {
    this.contratoService.desactivar(this.contrato_id).subscribe(
      (response: HttpResponse<Contrato>) => {
        this.toaster.success('Registro Borrado');
        this.router.navigate(['../'], {relativeTo: this.route});
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
      }
    );
  }

}
