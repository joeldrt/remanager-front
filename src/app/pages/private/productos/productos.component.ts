import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Producto } from '../../../_models';
import {AccountService, ProductoService, ToasterService} from '../../../_services';
import {Organizacion} from '../../../_models/organizacion';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  organizacionId: number;
  productos: Producto[];

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private toaster: ToasterService,
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.clearProductosArray();
    this.findAllByOrganizacion();
  }

  findAllByOrganizacion() {
    this.accountService.getAccountOrganization().subscribe(
      (response: HttpResponse<Organizacion>) => {
        this.organizacionId = response.body.id;
        this.findAllProducts(this.organizacionId);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error: ' + error.message);
      });
  }

  clearProductosArray() {
    this.productos = new Array<Producto>();
  }

  findAllProducts(organizacionId: number) {
    this.productoService.findAllByOrganizacion(organizacionId).subscribe(
      (value: HttpResponse<Producto[]>) => {
        if (value && value.body) {
          this.productos = value.body;
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ': ' + error.message);
      });
  }

  detalleDeProducto(producto: Producto) {
    this.router.navigate(['/productos', producto.id], { queryParams: { routeToReturn: '/productos'}});
  }

}
