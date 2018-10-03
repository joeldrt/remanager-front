import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../../environments/environment';

import {
  ProductoService,
  ToasterService
} from '../../../_services';

import {
  EstatusDeProducto,
  Producto, TipoContrato
} from '../../../_models';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {

  image_resource_url_base: string;
  producto_id: string;
  producto: Producto;

  default_images = ['./assets/img/producto_mock/casa1.jpeg',
    './assets/img/producto_mock/casa2.jpg',
    './assets/img/producto_mock/casa3.jpeg',
    './assets/img/producto_mock/casa4.jpeg',
    './assets/img/producto_mock/casa5.jpg'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private toaster: ToasterService
  ) {
    this.image_resource_url_base = environment.API_URL;
  }

  ngOnInit() {
    this.producto_id = this.route.snapshot.params['producto_id'];
    if (!this.producto_id) {
      this.toaster.error('No se especificó el id del producto');
      this.router.navigate(['../']);
      return;
    }
    this.getProducto();
  }

  getProducto() {
    this.productoService.getProductosById(this.producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
          this.append_base_url_to_fotos();
        } else {
          this.toaster.error('La respuesta del servido viene vacía');
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
      }
    );
  }

  append_base_url_to_fotos() {
    if (!this.producto.fotos || this.producto.fotos.length <= 0) {
      return;
    }
    const modify_array_fotos = new Array<string>();
    for (const url_foto of this.producto.fotos) {
      modify_array_fotos.push(this.image_resource_url_base + url_foto);
    }
    this.producto.fotos = modify_array_fotos;
  }

}
