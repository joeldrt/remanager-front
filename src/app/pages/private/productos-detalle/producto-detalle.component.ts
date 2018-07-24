import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { ProductoService, ToasterService } from '../../../_services';
import { Producto } from '../../../_models';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {

  producto: Producto;
  images = ['./assets/img/producto_mock/casa1.jpeg',
    './assets/img/producto_mock/casa2.jpg',
    './assets/img/producto_mock/casa3.jpeg',
    './assets/img/producto_mock/casa4.jpeg',
    './assets/img/producto_mock/casa5.jpg'];

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.getProducto(params.id);
        return;
      }
      this.toaster.error('Error: no se pudo recuperar el número del producto');
    });
  }

  getProducto(producto_id: number) {
    this.productoService.getProductosById(producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
        } else {
          this.toaster.error('La respuesta del servido viene vacía');
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.message);
      }
    );
  }

}
