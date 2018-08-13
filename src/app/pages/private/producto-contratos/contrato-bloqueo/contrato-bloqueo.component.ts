import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// Services
import { ProductoService, ClientService, ContratoService, ToasterService } from '../../../../_services';

// Models
import { Client, Contrato, Producto, TipoContrato } from '../../../../_models';
import {C} from '@angular/core/src/render3';

@Component({
  selector: 'app-contrato-bloqueo',
  templateUrl: './contrato-bloqueo.component.html',
  styleUrls: ['./contrato-bloqueo.component.scss']
})
export class ContratoBloqueoComponent implements OnInit {

  public client: Client;
  public product: Producto;
  public contract: Contrato;
  public routeToReturn: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductoService,
    private clientService: ClientService,
    private toasterService: ToasterService,
  ) {
    this.client = new Client();
    this.product = new Producto();
    this.contract = new Contrato();
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams) {
      this.client.id = this.route.snapshot.queryParams['idClient'];
      this.product.id = this.route.snapshot.queryParams['idProduct'];
      this.routeToReturn = this.route.snapshot.queryParams['routeToReturn'];

      this.getClient();
      this.getProduct();


    } else {
      this.router.navigate(['/productos']);
    }
  }

  getClient() {
    if (this.client.id) {
      this.clientService.find(this.client.id)
        .subscribe((res: HttpResponse<Client>) => {
            this.client = res.body;
          },
          (res: HttpErrorResponse) => {
            console.log('Error : ' + res.message);
            this.toasterService.error(res.message);
          });
    }
  } // end - getClient

  getProduct() {
    if (this.product.id) {
      this.productService.getProductosById(this.product.id).subscribe(
        (response: HttpResponse<Producto>) => {
          if (response.body) {
            this.product = response.body;
          } else {
            this.toasterService.error('La respuesta del servido viene vacía');
          }
        },
        (error: HttpErrorResponse) => {
          this.toasterService.error(error.message);
        }
      );
    }
  } // end - getProducto

}
