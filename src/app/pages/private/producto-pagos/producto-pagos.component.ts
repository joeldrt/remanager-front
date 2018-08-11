import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

// Services
import {ClientService, ContratoService, ProductoService, ToasterService} from '../../../_services';

// Models
import { Client, Contrato, Producto } from '../../../_models';
import {ProductUtils} from '../../../_utils/product.utils';

@Component({
  selector: 'app-producto-pagos',
  templateUrl: './producto-pagos.component.html',
  styleUrls: ['./producto-pagos.component.scss']
})
export class ProductoPagosComponent implements OnInit {

  public client: Client;
  public contract: Contrato;
  public product: Producto;
  public routeToReturn: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private contratoService: ContratoService,
    private productoService: ProductoService,
    private toasterService: ToasterService,
  ) {
    this.client = new Client();
    this.contract = new Contrato();
    this.product = new Producto();
  }

  ngOnInit() {
    this.client.id = this.route.snapshot.queryParams['idClient'];
    this.contract.id = this.route.snapshot.queryParams['idContract'];
    this.product.id = this.route.snapshot.queryParams['idProduct'];
    this.routeToReturn = this.route.snapshot.queryParams['routeToReturn'];

    if (this.client.id) {
      this.getClient();
    }
    if (this.contract.id) {
      this.getContract();
    }
    if (this.product.id) {
      this.getProduct();
    }
  }// end - ngOnInit

  getClient() {
    this.clientService.find(this.client.id)
      .subscribe(
        (res: HttpResponse<Client>) => {
          this.client = res.body;
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error(res.message);
          console.log('Error :: ' + res.message);
        });
  }// end - getClient

  getProduct() {
    this.productoService.getProductosById(this.product.id)
      .subscribe((res: HttpResponse<Producto>) => {
        this.product = res.body;
      },
        (res: HttpErrorResponse) => {
        this.toasterService.error(res.message);
        console.log('Error: ' + res.message);
      });
  }// end -getProduct

  getContract() {
    this.contratoService.getContractForClientId(this.contract.id)
      .subscribe(
        (res: HttpResponse<Contrato>) => {
          this.contract = res.body;
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error(res.message);
          console.log('Error: ' + res.message);
        });
  }// end - getContract
}
