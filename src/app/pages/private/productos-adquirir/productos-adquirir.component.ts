import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// Services
import { ProductoService, ClientService, ContratoService, ToasterService } from '../../../_services';

// Models
import { Producto } from '../../../_models';
import { Client } from '../../../_models/client';
import { Contrato, TipoContrato, PagoReal } from '../../../_models/contrato';

// Helpers
import { HeaderHelper } from '../../../_helpers';

@Component({
  selector: 'app-productos-adquirir',
  templateUrl: './productos-adquirir.component.html',
  styleUrls: ['./productos-adquirir.component.scss']
})
export class ProductosAdquirirComponent implements OnInit {

  public DIAS_VALIDEZ = 3;
  public DIAS_VALIDEZ_APARTADO = 20;
  public MONTO_MINIMO_APARTADO = 10000;

  public producto_id: string;
  public producto: Producto;

  public cliente_id: string;
  public cliente: Client;

  public clientes: Client[];

  public monto_apartar: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private clientService: ClientService,
    private contratoService: ContratoService,
    private toaster: ToasterService,
    private headerHelper: HeaderHelper
  ) {
  }

  ngOnInit() {
    this.producto_id = this.route.snapshot.params['producto_id'];
    if (!this.producto_id) {
      this.toaster.error('No se especificó el producto');
      this.router.navigate(['../']);
      return;
    }
    this.route.params.subscribe((params) => {
      this.cliente_id = params.cliente_id;
      if (this.cliente_id) {
        this.getCliente();
      }
    });
    this.getProducto();
    this.obtenerClientesPorVendedor();
  }

  getProducto() {
    this.productoService.getProductosById(this.producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
          this.headerHelper.sendHeaderTitleRequest('Adquirir');
        } else {
          this.toaster.error('La respuesta del servido viene vacía');
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
        this.router.navigate(['../']);
      }
    );
  } // end - getProducto

  getCliente() {
    this.clientService.find(this.cliente_id).subscribe(
      (res: HttpResponse<Client>) => {
        this.cliente = res.body;
      },
      (res: HttpErrorResponse) => {
        console.log('Error : ' + res.message);
        this.toaster.error(res.message);
      }
    );
  } // end - getClient

  obtenerClientesPorVendedor() {
    this.clientService.searchByCv().subscribe(
      (res: HttpResponse<Client[]>) => {
        this.clientes = res.body;
      },
      (res: HttpErrorResponse) => {
        console.log('Error : ' + res.message);
        this.toaster.error(res.message);
      }
    );
  }

  asignarCliente(cliente_id: string) {
    if (!this.cliente_id) {
      this.router.navigate(['./', cliente_id], {relativeTo: this.route});
      return;
    }
    this.router.navigate(['../', cliente_id], {relativeTo: this.route});
      return;
  }

  bloquearProducto() {
    const contrato = new Contrato();
    contrato.tipo = TipoContrato.BLOQUEO;
    contrato.clienteId = this.cliente_id;
    contrato.productoId = this.producto_id;
    contrato.diasValidez = this.DIAS_VALIDEZ;
    this.contratoService.create(contrato).subscribe(
      (response: HttpResponse<Contrato>) => {
        this.toaster.success('El producto: ' + this.producto.nombre + ' se bloqueo correctamente');
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' Error: ' + error.message);
      }
    );
  }

  apartarProducto() {
    const contrato = new Contrato();
    contrato.tipo = TipoContrato.APARTADO;
    contrato.clienteId = this.cliente_id;
    contrato.productoId = this.producto_id;
    contrato.diasValidez = this.DIAS_VALIDEZ_APARTADO;
    this.contratoService.create(contrato).subscribe(
      (response: HttpResponse<Contrato>) => {
        this.agregarPagoRealApartado(response.body.id);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' Error: ' + error.message);
      }
    );
  }

  agregarPagoRealApartado(contrato_id) {
    const pago_real = new PagoReal();
    pago_real.monto = this.monto_apartar;
    this.contratoService.addPagoReal(contrato_id, pago_real).subscribe(
      (response: HttpResponse<Contrato>) => {
        this.toaster.success('El producto: ' + this.producto.nombre + ' se apartó correctamente');
        this.router.navigate(['../../'], {relativeTo: this.route});
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' Error: ' + error.message);
      }
    );
  }

}
