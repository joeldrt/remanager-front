import { Component, OnInit, AfterViewInit } from '@angular/core';

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
  public organization: Organizacion;
  public inputSearch: string;

  constructor(
    private accountService: AccountService,
    private clientService: ClientService,
    private toasterService: ToasterService
  ) {
    this.user = new User();
    this.clients = null;
    this.organization = new Organizacion();
    this.inputSearch = '';
  }

  ngOnInit() {
    this.getAccount();
  }

  ngAfterViewInit(){
  }

  clickOnClient(client: Client){
  }// end - clickOnClient(event)

  getAccount(){
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
    if (this.inputSearch) {
      this.clientService.search({
        query: this.inputSearch,
      }).subscribe(
        (res: HttpResponse<Client[]>) => {
          this.clients = res.body
        },
        (res: HttpErrorResponse) => {
          console.log('Error: ' + res);
        }
      );
      return;
    } // end - if (this.inputSearch)

    if(this.user) {
      this.clientService.searchByCv(this.user.email)
        .subscribe(
        (res: HttpResponse<Client[]>) => {
          this.clients = res.body;
          this.inputSearch = '';
        },
        (res: HttpErrorResponse) => {
          console.log('Error :: ' + res);
        }
      );
    }// end - if(this.user)
  } // end - loadAll

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
