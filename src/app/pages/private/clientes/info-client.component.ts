import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

// Services
import {ClientService, ContratoService, ProductoService, ToasterService} from '../../../_services';

// Models
import {Client, Contrato, Producto} from '../../../_models';
import {ProductUtils} from '../../../_utils/product.utils';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit, AfterViewInit {

  public returnTo: string;
  public client: Client;
  public listProductos: Producto[];
  public listContratos: Contrato[];
  public existContracts: boolean;
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private contratoService: ContratoService,
    private toasterService: ToasterService,
    private productoService: ProductoService,
    private productUtils: ProductUtils,
  ) {
    this.client = new Client();
    this.listContratos = new Array<Contrato>();
    this.returnTo = null;
    this.existContracts = false;
    this.loading = true;
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['id']) {
      this.returnTo = this.route.snapshot.queryParams['returnTo'];
      this.client.id = this.route.snapshot.queryParams['id'];
    } else {
      this.goBackPage();
    }
    this.listProductos = new Array<Producto>();
  }// end - ngOnInit

  ngAfterViewInit() {
    if (this.client.id) {
      this.clientService.find(this.client.id)
        .subscribe(
          (res: HttpResponse<Client>) => {
            this.client = res.body;
            this.getContractsByClient(this.client.id);
          },
          (res: HttpErrorResponse) => {
            this.toasterService.error(res.message);
            console.log('Error :: ' + res);
          });
    }
  }// end - ngAfterViewInit()

  goBackPage() {
    this.router.navigate(['/clientes']);
  }// end - goBackPage

  getContractsByClient(idClient: string) {
    this.contratoService.findAllForClienteId(idClient)
      .subscribe(
        (res: HttpResponse<Contrato[]>) => {
          this.listContratos = res.body;
          if (this.listContratos.length > 0) {
            this.existContracts = true;
            this.getListProducts();
          }
          this.loading = false;
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        });
  }// end - getContractsByClient(idClient: string)

  getListProducts() {
    if (this.listContratos) {
      this.listContratos.forEach(contrato => {
        this.productoService.getProductosById(contrato.productoId)
          .subscribe(
            (res: HttpResponse<Producto>) => {
              const prod = res.body;
              this.listProductos.push(prod);
            },
            (res: HttpErrorResponse) => {
              console.log('Error: ' + res.message);
              this.toasterService.error(res.message);
            });
      });
    }
  }// end - getListProducts()

  colorByStatus(status: string): string {
    return this.productUtils.colorByStatus(status);
  }

  goPaymentsProduct(idProducto: string) {
    let idContrato = '';
    this.listContratos.forEach(contrato => {
      if (contrato.productoId === idProducto) {
        idContrato = contrato.id;
      }
    });
    this.router.navigate(['/pagosproducto'],
      {queryParams : {
        idClient: this.client.id,
        idProduct: idProducto,
        idContract: idContrato,
        routeToReturn: '/clientes/info',
      }});
  }// end - goPaymentsProduct

}// end - InfoClientComponent
