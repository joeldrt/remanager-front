import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { ClientService, AccountService } from '../../../_services';
import {ToasterService} from '../../../_services';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

// Models
import { Client } from '../../../_models/client';
import { User } from '../../../_models/user';
import { Organizacion } from '../../../_models/organizacion';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit, AfterViewInit {
  public user: User;
  public clients: Client[];
  public listClientsService: Client[];
  public organization: Organizacion;
  public inputSearch: string;
  public returnTo: string;
  public returnClientId: string;
  public productId: string;
  public loading: boolean;

  constructor(
    private accountService: AccountService,
    private clientService: ClientService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user = new User();
    this.clients = null;
    this.listClientsService = null;
    this.organization = new Organizacion();
    this.inputSearch = '';
    this.returnTo = null;
    this.productId = null;
    this.loading = true;
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams['returnTo']) {
      this.returnTo = this.route.snapshot.queryParams['returnTo'];
      this.productId = this.route.snapshot.queryParams['productoId'];
    }
    this.getAccount();
  }

  ngAfterViewInit() {
  }

  getAccount() {
    this.accountService.getAccount().subscribe(
      (response: HttpResponse<User>) => {
        this.user = response.body;
        this.loadAll();
        this.getOrganization();
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
      });
  }// end - getAccount

  loadAll() {
    if (this.user) {
      this.clientService.searchByCv(this.user.email)
        .subscribe(
        (res: HttpResponse<Client[]>) => {
          this.clients = res.body;
          this.listClientsService = res.body;
          this.inputSearch = '';
          this.loading = false;
        },
        (res: HttpErrorResponse) => {
          console.log('Error :: ' + res);
        }
      );
    }// end - if(this.user)
  } // end - loadAll

  getOrganization() {
    this.accountService.getAccountOrganization()
      .subscribe((res: HttpResponse<Organizacion>) => {
        this.organization = res.body;
      },
        (res: HttpErrorResponse) => {
          this.toasterService.error('Error: ' + res.message);
        }
      );
  } // end - getOrganization()

  inputTextSearch(value) {
    this.clients = new Array();
    this.listClientsService.forEach(item => {
      if (item.nombre && item.apellidos) {
        if (item.nombre.toLowerCase().includes(value.toLowerCase())
          || item.apellidos.toLowerCase().includes(value.toLowerCase())) {
          this.clients.push(item);
        }
      }
    });
  }// end - inputTextSearch

  agregarCliente() {
    if (this.returnTo) {
      this.router.navigate(['/clientes/add'],
        {queryParams: {
            returnTo: this.returnTo,
            productId: this.productId,
            correoVendedor: this.user.email,
            organizationId: this.organization.id}});
    } else {
      this.returnTo = '/clientes';
      this.router.navigate(['/clientes/add'],
        {queryParams: {
            returnTo: this.returnTo,
            correoVendedor: this.user.email,
            organizationId: this.organization.id}});
    }
  } // end - agregarCliente()

  clickOnClient(clientSelected) {
    if (!this.returnTo) {
      this.router.navigate(['/clientes/info'],
        {queryParams: { id: clientSelected.id, returnTo: this.returnTo}});
    } else {
      this.router.navigate(['/adquirir', this.productId],
        {queryParams: {
            clientId: clientSelected.id,
            returnTo: this.returnTo
          }});
    }
  } // end - clickOnClient()

}
