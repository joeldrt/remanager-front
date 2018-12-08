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
  selector: 'app-vender',
  templateUrl: './vender.component.html',
  styleUrls: ['./vender.component.scss']
})
export class VenderComponent implements OnInit {

  producto_id: string;
  producto: Producto;

  cliente_id: string;
  cliente: Client;

  contrato: Contrato;

  restante_a_pagar: number;
  pagos: PagoProgramado[];

  // calculadora
  fecha_primer_pago: string;
  fecha_liquidacion: string;
  num_parcialidades: number;

  // pago manual variables
  fecha_pago: string;
  monto_de_pago: number;

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
    this.producto_id = this.route.snapshot.params['producto_id'];
    if (!this.producto_id) {
      this.toaster.error('No se especificó el producto');
      this.router.navigate(['../'], {relativeTo: this.route});
      return;
    }
    this.cliente_id = this.route.snapshot.params['cliente_id'];
    if (!this.cliente_id) {
      this.toaster.error('No se especificó el cliente');
      this.router.navigate(['../'], {relativeTo: this.route});
      return;
    }
    this.iniciarVariables();
    this.cargarProducto();
    this.cargarCliente();
  }

  iniciarVariables() {
    this.pagos = new Array<PagoProgramado>();
    this.contrato = new Contrato();
    this.contrato.tipo = TipoContrato.VENTA;
    this.contrato.clienteId = this.cliente_id;
    this.contrato.productoId = this.producto_id;
  }

  cargarProducto() {
    this.productoService.getProductosById(this.producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
          this.calcularRestanteAPagar();
        } else {
          this.toaster.error('La respuesta del servido viene vacía');
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status: ' + error.status + ' message: ' + error.error.message);
        this.router.navigate(['../'], {relativeTo: this.route});
      }
    );
  }

  cargarCliente() {
    this.clientService.find(this.cliente_id).subscribe(
      (response: HttpResponse<Client>) => {
        if (response.body) {
          this.cliente = response.body;
          this.headerHelper.sendHeaderTitleRequest('Venta de producto');
        } else {
          this.toaster.error('La respuesta del servido viene vacía');
          this.router.navigate(['../']);
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status: ' + error.status + ' message: ' + error.error.message);
        this.router.navigate(['../']);
      }
    );
  }

  calcularRestanteAPagar() {
    if (!this.pagos || this.pagos.length === 0) {
      this.restante_a_pagar = this.producto.precio;
      return;
    }
    this.ordenarPagosPorFecha();
    this.restante_a_pagar = this.producto.precio;
    for (const pago of this.pagos) {
      this.restante_a_pagar = this.restante_a_pagar - pago.monto;
    }
    // fix para que se muestre el label cuando restante_a_pagar se convierte en 0
    if (this.restante_a_pagar === 0) {
      this.restante_a_pagar = 0.001;
    }
  }

  ordenarPagosPorFecha() {
    if (!this.pagos || this.pagos.length === 0) {
      return;
    }
    this.pagos.sort(
      (a: PagoProgramado, b: PagoProgramado) => {
        if (a.fechaCompromisoPago < b.fechaCompromisoPago) {
          return -1;
        }
        if (a.fechaCompromisoPago > b.fechaCompromisoPago) {
          return 1;
        }
        return 0;
      }
    );
  }

  generarParcialidades() {
    const fecha_inicio = this.dateUtils.toDate(this.fecha_primer_pago);
    const fecha_final = this.dateUtils.toDate(this.fecha_liquidacion);

    const diferencia_de_tiempo = Math.abs(fecha_inicio.getTime() - fecha_final.getTime());

    const numero_de_dias = Math.ceil(diferencia_de_tiempo / (1000 * 3600 * 24));
    console.log('Numero de dias entre fechas: ' + numero_de_dias);

    const numero_de_dias_entre_pagos = Math.floor(numero_de_dias / (this.num_parcialidades - 1));
    console.log('Numero de dias entre pagos: ' + numero_de_dias_entre_pagos);

    const monto_a_pagar = this.restante_a_pagar / this.num_parcialidades;
    console.log('Monto por cada pago: ' + monto_a_pagar);

    const fecha_usar = new Date(fecha_inicio.getUTCFullYear(), fecha_inicio.getUTCMonth(), fecha_inicio.getUTCDate(), 0, 0, 0, 0);
    for (let i = 0; i < this.num_parcialidades; i++) {
      const pago = new PagoProgramado();
      pago.fechaCompromisoPago = new Date(fecha_usar.getUTCFullYear(), fecha_usar.getUTCMonth(), fecha_usar.getUTCDate(), 0, 0, 0, 0);
      pago.monto = monto_a_pagar;
      const siguiente_fecha = fecha_usar.getDate() + numero_de_dias_entre_pagos;
      fecha_usar.setDate(siguiente_fecha);

      this.pagos.push(pago);
    }
    this.calcularRestanteAPagar();
  }

  limpiarCalculadora() {
    this.fecha_primer_pago = '';
    this.fecha_liquidacion = '';
    this.num_parcialidades = undefined;
  }

  borrarPagoProgramado(indice: number) {
    if (indice >= this.pagos.length || indice < 0) {
      return;
    }
    this.pagos.splice(indice, 1);
    this.calcularRestanteAPagar();
  }

  agregarPagoManual() {
    if (!this.fecha_pago || !this.monto_de_pago) {
      return;
    }
    const pago_programado = new PagoProgramado();
    const fecha_usar = this.dateUtils.toDate(this.fecha_pago);
    pago_programado.fechaCompromisoPago = new Date(fecha_usar.getUTCFullYear(),
                                                  fecha_usar.getUTCMonth(),
                                                  fecha_usar.getUTCDate(),
                                                  0, 0, 0, 0);
    pago_programado.monto = this.monto_de_pago;
    this.pagos.push(pago_programado);
    this.calcularRestanteAPagar();
  }

  limpiarPagoManual() {
    this.fecha_pago = '';
    this.monto_de_pago = undefined;
  }

  calcularDiasValidez() {
    const primera_fecha = new Date();
    const segunda_fecha = this.pagos[this.pagos.length - 1].fechaCompromisoPago;

    const diferencia_de_tiempo = Math.abs(primera_fecha.getTime() - segunda_fecha.getTime());

    const numero_de_dias = Math.ceil(diferencia_de_tiempo / (1000 * 3600 * 24));
    this.contrato.diasValidez = numero_de_dias;
  }

  cerrarVenta() {
    if (this.restante_a_pagar > 0 && this.restante_a_pagar > 1) {
      this.toaster.error('No se a cubierto el precio del producto');
      return;
    }
    this.contrato.pagosProgramados = this.pagos;
    this.calcularDiasValidez();
    this.contratoService.create(this.contrato).subscribe(
      (response: HttpResponse<Contrato>) => {
        this.toaster.success('venta generada, información mandada al cliente y áreas correspondientes');
        this.router.navigate(['../../../'], {relativeTo: this.route});
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status: ' + error.status + ' message: ' + error.error.message);
      }
    );
  }

}
