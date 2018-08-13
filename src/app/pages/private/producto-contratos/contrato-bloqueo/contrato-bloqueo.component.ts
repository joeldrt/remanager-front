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

  blockProperty() {
    this.contract.clienteId = this.client.id;
    this.contract.productoId = this.product.id;
    this.contract.diasValidez = this.diasApartado;
    this.contract.tipo = TipoContrato.BLOQUEO;
    this.contractService.create(this.contract)
      .subscribe(
        (res: HttpResponse<Contrato>) => {
          this.contract = res.body;
          this.toasterService.success('¡Contrato generado!');

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

  addDays(date, days): any {
    date.setDate(date.getDate() + days);
    return date;
  }

  getDaysBetweenDates(dateStart: any, dateEnd: any): any {
    const daysDiff =  Math.round((dateEnd.getTime() - dateStart.getTime()) / (1000 * 60  * 60 * 24));
    return daysDiff;
  }

  getDateFormat(theDate: any): any {
    let dd = theDate.getDate();
    let mm = theDate.getMonth() + 1;
    let yyyy = theDate.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return theDate = dd + '/' + mm + '/' + yyyy;
  }

  getInfoDate() {
    this.fechaBloqueo = this.getDateFormat(this.contract.fechaCreacion);
    this.fechaLimite = this.addDays(this.contract.fechaCreacion, this.contract.diasValidez);
    this.diasRestantes = this.getDaysBetweenDates(new Date(), this.fechaLimite);
  }

}
