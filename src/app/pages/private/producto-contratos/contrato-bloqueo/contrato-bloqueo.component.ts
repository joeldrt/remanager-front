import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

// Services
import { ProductoService, ClientService, ContratoService, ToasterService } from '../../../../_services';

// Models
import { Client, Contrato, Producto, TipoContrato } from '../../../../_models';

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
  public diasApartado: number;

  public fechaBloqueo: any;
  public fechaLimite: any;
  public diasRestantes: any;

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
  } // end - ngOnInit

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

  getContract() {
    this.contractService.getContractForId(this.contract.id)
      .subscribe(
        (res: HttpResponse<Contrato>) => {
          this.contract = res.body;
          this.getInfoDate();
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        });
  }

  blockProperty() {
    this.contract.clienteId = this.client.id;
    this.contract.productoId = this.product.id;
    this.contract.diasValidez = this.diasApartado;
    this.contract.tipo = TipoContrato.BLOQUEO;
    this.contractService.create(this.contract)
      .subscribe(
        (res: HttpResponse<Contrato>) => {
          this.contract = res.body;
          this.toasterService.success('¡Bloqueado!');

          this.getProduct();
          this.getInfoDate();

        }, (res: HttpErrorResponse) => {
          this.toasterService.error(res.message);
        });
  } // end - blockProperty()

  testSumarFecha() {
    const date = new Date('2018-08-13T02:56:35.943998');
    console.log('Add Days :' + this.addDays(date, 4));
    console.log('Get Days :' + this.getDaysBetweenDates(new Date('2018-08-13T02:56:35.943998'), new Date('2018-08-16T02:56:35.943998')));
    console.log('Get Date Format : ' + this.getDateFormat(new Date('2018-08-13T02:56:35.943998')));
  }

  addDays(date: Date, days): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  getDaysBetweenDates(dateStart: Date, dateEnd: Date): number {
    const daysDiff =  Math.round((dateEnd.getTime() - dateStart.getTime()) / (1000 * 60  * 60 * 24));
    return daysDiff;
  }

  getDateFormat(theDate: Date): string {
    let dd = theDate.getDate().toString();
    let mm = (theDate.getMonth() + 1).toString();
    let yyyy = theDate.getFullYear().toString();
    if (dd.length < 2) {
      dd = '0' + dd;
    }
    if (mm.length < 2) {
      mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
  }

  getStringDateFormat(dateString: string): string {
    let arrayTemp = dateString.split('/');
    return arrayTemp[2] + '-' + arrayTemp[1] + '-' + arrayTemp[0];
  }

  getInfoDate() {
    let replaceFecha = '';
    this.fechaBloqueo = this.getDateFormat(new Date(this.contract.fechaCreacion));
    this.fechaLimite = this.getDateFormat(this.addDays(new Date(this.contract.fechaCreacion), this.contract.diasValidez));
    replaceFecha = this.getStringDateFormat(this.fechaLimite);
    this.diasRestantes = this.getDaysBetweenDates(new Date(), new Date(replaceFecha));
  }

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

  goToPage(page: string) {
    let nameRoute = '';
    switch (page) {
      case '/venta': {
        nameRoute = page;
        break;
      }
      case '/corrida': {
        nameRoute = page;
        break;
      }
      case '/apartado': {
        nameRoute = page;
        break;
      }
    }
    this.router.navigate([nameRoute], {queryParams : {
        idClient: this.client.id,
        idProduct: this.product.id,
        idContract: this.contract.id,
        routeToReturn: '/bloqueo',
      }});
  }// end - goToPage
}
