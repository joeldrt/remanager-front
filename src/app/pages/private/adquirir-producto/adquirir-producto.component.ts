import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment} from '../../../../environments/environment';

import { ProyectoService, ToasterService } from '../../../_services';

import { Producto } from '../../../_models';

@Component({
  selector: 'app-adquirir-producto',
  templateUrl: './adquirir-producto.component.html',
  styleUrls: ['./adquirir-producto.component.scss']
})
export class AdquirirProductoComponent implements OnInit, OnDestroy {

  public productoId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProyectoService,
    private toaster: ToasterService
  ) {

  }

  ngOnInit() {
    debugger
    this.productoId = this.route.snapshot.params['id'];
  }

  ngOnDestroy() {
  }

}
