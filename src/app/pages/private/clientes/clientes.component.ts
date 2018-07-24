import { Component, OnInit } from '@angular/core';

// Services
import { ClientService } from '../../../_services/client.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
