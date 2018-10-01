import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// Services
import { ProductoService, ClientService, ToasterService } from '../../../_services';

// Models
import { Producto } from '../../../_models';
import { Client } from '../../../_models/client';

// Helpers
import { HeaderHelper } from '../../../_helpers';

@Component({
  selector: 'app-adquirir-producto',
  templateUrl: './adquirir-producto.component.html',
  styleUrls: ['./adquirir-producto.component.scss']
})
export class AdquirirProductoComponent implements OnInit, OnDestroy, AfterViewInit {

  public producto_id: string;
  public producto: Producto;

  public cliente_id: string;
  public cliente: Client;

  public typeAction: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private clientService: ClientService,
    private toasterService: ToasterService,
    private headerHelper: HeaderHelper
  ) {
  }

  ngOnInit() {
    this.producto_id = this.route.snapshot.params['producto_id'];
    if (!this.producto_id) {
      this.toasterService.error('No se especificó el producto');
      this.router.navigate(['../']);
      return;
    }
    this.route.queryParams.subscribe(params => {
      this.cliente_id = params.cliente_id;
      if (this.cliente_id) {
        this.getCliente();
      }
    });
    this.getProducto();
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {
  }

  getProducto() {
    this.productoService.getProductosById(this.producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
          this.headerHelper.sendHeaderTitleRequest(this.producto.nombre);
        } else {
          this.toasterService.error('La respuesta del servido viene vacía');
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
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
        this.toasterService.error(res.message);
      }
    );
  } // end - getClient

}// end - AdquirirProductoComponent - class
