import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { FooterMenuhelper } from '../../../_helpers/footer-menuhelper';

import { environment } from '../../../../environments/environment';

import {
  ProductoService,
  ToasterService
} from '../../../_services';

import {
  EstatusDeProducto,
  Producto, TipoContrato
} from '../../../_models';
import {
  HeaderHelper
} from '../../../_helpers';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit, OnDestroy {

  image_resource_url_base: string;
  productoId: number;
  producto: Producto;
  loading: boolean;

  routeToReturn: string;

  default_images = ['./assets/img/producto_mock/casa1.jpeg',
    './assets/img/producto_mock/casa2.jpg',
    './assets/img/producto_mock/casa3.jpeg',
    './assets/img/producto_mock/casa4.jpeg',
    './assets/img/producto_mock/casa5.jpg'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private footerMenu: FooterMenuhelper,
    private toaster: ToasterService,
    private headerHelper: HeaderHelper
  ) {
    this.image_resource_url_base = environment.API_URL;
    this.loading = true;
  }

  ngOnInit() {
    this.productoId = this.route.snapshot.params['id'];
    if (!this.productoId) {
      this.toaster.error('No se especificó el producto');
      this.router.navigate(['/proyectos']);
      return;
    }
    this.getProducto(this.route.snapshot.params['id']);
    this.routeToReturn = this.route.snapshot.queryParams['routeToReturn'];
    if (!this.routeToReturn) {
      this.routeToReturn = '/proyectos';
    }
  }

  ngOnDestroy() {
    if (!this.producto) {
      return;
    }
    this.footerMenu.clearButtons('/productos/' + this.producto.id);
  }

  navegarAnterior() {
    this.router.navigate([this.routeToReturn]);
  }

  getProducto(producto_id: string) {
    this.productoService.getProductosById(producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
          this.append_base_url_to_fotos();
          this.headerHelper.sendHeaderTitleRequest(this.producto.nombre);
          this.setFooterMenu(this.producto);
          this.loading = false;
        } else {
          this.toaster.error('La respuesta del servido viene vacía');
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
      }
    );
  }

  setFooterMenu(producto: Producto) {
    if (producto.estatus === EstatusDeProducto.DISPONIBLE) {
      this.footerMenu.clearButtons('/productos/' + producto.id);
      this.footerMenu.addButtonFromValues(
        '/productos/' + producto.id,
        'Adquirir producto',
        'fa fa-shopping-cart',
        '/adquirir/' + this.productoId,
        {'routeToReturn': this.routeToReturn}
      );
      this.footerMenu.sendMenuRequest('/productos/' + producto.id);
      return;
    }
    this.footerMenu.clearButtons('/productos/' + producto.id);
    this.footerMenu.addButtonFromValues(
      '/productos/' + producto.id,
      'Producto ' + producto.estatus.toString().toLowerCase(),
      'fa fa-lock'
    );
    this.footerMenu.sendMenuRequest('/productos/' + producto.id);
  }

  append_base_url_to_fotos() {
    if(!this.producto.fotos || this.producto.fotos.length <= 0) {
      return;
    }
    const modify_array_fotos = new Array<string>();
    for (const url_foto of this.producto.fotos) {
      modify_array_fotos.push(this.image_resource_url_base + url_foto);
    }
    this.producto.fotos = modify_array_fotos;
  }

}
