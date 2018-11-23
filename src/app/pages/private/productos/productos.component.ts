import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Producto } from '../../../_models';
import {AccountService, ProductoService, ToasterService} from '../../../_services';
import {Organizacion} from '../../../_models/organizacion';
import {ProductUtils} from '../../../_utils/product.utils';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  public organizacionId: number;
  public productos: Producto[];
  public listProductsService: Producto[];
  public inputSearch: string;
  public loading: boolean;

  constructor(
    private router: Router,
    private productoService: ProductoService,
    private toaster: ToasterService,
    private accountService: AccountService,
    private productUtils: ProductUtils,
  ) {
    this.inputSearch = '';
    this.listProductsService = null;
    this.loading = true;
  }

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
    this.productoService.findAllByOrganizacion(String(organizacionId)).subscribe(
      (value: HttpResponse<Producto[]>) => {
        if (value && value.body) {
          this.productos = value.body;
          this.listProductsService = value.body;
          this.loading = false;
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('Error ' + error.status + ': ' + error.message);
      });
  }// end - findAllProducts

  colorByStatus(status: string): string {
    return this.productUtils.colorByStatus(status);
  }

  inputTextSearch(value) {
    this.productos = new Array();
    this.listProductsService.forEach(item => {
      if (item.nombre && item.descripcion) {
        const valueSearch = item.nombre.toLowerCase() + ' ' + item.estatus + ' ' + item.precio;
        if (valueSearch.includes(value.toLowerCase())) {
          this.productos.push(item);
        }
      } else {

      }
    });
    this.loading = false;
  }// end - inputTextSearch

}
