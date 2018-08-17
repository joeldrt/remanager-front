import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// Services
import { ProductoService, ClientService, ContratoService, ToasterService } from '../../../../_services';

// Models
import { Client, Contrato, Producto, TipoContrato } from '../../../../_models';

@Component({
  selector: 'app-contrato-apartado',
  templateUrl: './contrato-apartado.component.html',
  styleUrls: ['./contrato-apartado.component.scss']
})
export class ContratoApartadoComponent implements OnInit {

  public client: Client;
  public product: Producto;
  public contract: Contrato;
  public routeToReturn: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductoService,
    private clientService: ClientService,
    private contractService: ContratoService,
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

      if (this.route.snapshot.queryParams['idContract']) {
        this.contract.id = this.route.snapshot.queryParams['idContract'];
        this.getContract();
      }
      this.getClient();
      this.getProduct();
    } else {
      this.router.navigate(['/productos']);
    }
  }

  getContract() {
    this.contractService.getContractForId(this.contract.id)
      .subscribe(
        (res: HttpResponse<Contrato>) => {
          this.contract = res.body;
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        });
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

  returnToPage() {
    switch (this.routeToReturn) {
      case '/clientes/info': {
        this.router.navigate([this.routeToReturn], { queryParams:
            {
              id: this.client.id
            }});
        break;
      }
      case '/adquirir': {
        this.router.navigate([this.routeToReturn, this.product.id]);
        break;
      }
    }
  }
}
