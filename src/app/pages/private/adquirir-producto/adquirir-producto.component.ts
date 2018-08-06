import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment} from '../../../../environments/environment';

// Services
import { ProductoService, ClientService, AccountService, ToasterService } from '../../../_services';

// Models
import { Producto } from '../../../_models';
import { User } from '../../../_models';
import { Organizacion } from '../../../_models/organizacion';

// Helpers
import { HeaderHelper } from '../../../_helpers';

@Component({
  selector: 'app-adquirir-producto',
  templateUrl: './adquirir-producto.component.html',
  styleUrls: ['./adquirir-producto.component.scss']
})
export class AdquirirProductoComponent implements OnInit, OnDestroy {

  public user: User;
  public organization: Organizacion;
  public producto: Producto;
  public productoId: string;
  public clientId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private toasterService: ToasterService,
    private headerHelper: HeaderHelper,
    private accountService: AccountService
  ) {
    this.user = new User();
    this.organization = new Organizacion();
    this.clientId = null;
  }

  ngOnInit() {
    this.productoId = this.route.snapshot.params['id'];
    if (!this.productoId) {
      this.toasterService.error('No se especificó el producto');
      this.router.navigate(['/proyectos']);
      return;
    }
    if (this.route.snapshot.params['clientId']) {
      this.clientId = this.route.snapshot.params['clientId'];
    }
    this.getProducto(this.productoId);
    this.getAccount();
  }

  ngOnDestroy() {
  }

  getProducto(producto_id: string) {
    this.productoService.getProductosById(producto_id).subscribe(
      (response: HttpResponse<Producto>) => {
        if (response.body) {
          this.producto = response.body;
          this.headerHelper.sendHeaderTitleRequest(this.producto.nombre);
        } else {
          this.toasterService.error('La respuesta del servido viene vacía');
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
      }
    );
  } // end - getProducto

  getAccount() {
    this.accountService.getAccount().subscribe(
      (response: HttpResponse<User>) => {
        this.user = response.body;
        this.getOrganization();
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
      });
  }// end - getAccount

  getOrganization(){
    this.accountService.getAccountOrganization()
      .subscribe((res: HttpResponse<Organizacion>) => {
          this.organization = res.body;
        },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        }
      );
  } // end - getOrganization()
}
