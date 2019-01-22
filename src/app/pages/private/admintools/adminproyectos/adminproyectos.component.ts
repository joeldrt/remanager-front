import { Component, OnInit } from '@angular/core';
import { Proyecto, User, Producto } from 'src/app/_models';
import { AccountService, ProyectoService, ToasterService, ProductoService } from 'src/app/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adminproyectos',
  templateUrl: './adminproyectos.component.html',
  styleUrls: ['./adminproyectos.component.scss']
})
export class AdminproyectosComponent implements OnInit {

  usuario_actual: User;
  proyecto_actual_id: String;
  proyecto_actual: Proyecto;
  subproyectos: Proyecto[];
  productos: Producto[];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private toaster: ToasterService,
    private productoService: ProductoService,
  ) 
  {
    this.route.params.subscribe(
      params => {
        this.proyecto_actual_id = params.proyecto_actual_id;
        this.hacerCargaDeProyectos();
      });
  }

  ngOnInit() {
    this.usuario_actual = this.accountService.getStoredAccount();
    if(!this.usuario_actual) {
      this.router.navigate(['/login']);
    }
    this.hacerCargaDeProyectos();
  }

  hacerCargaDeProyectos() {
    if(!this.proyecto_actual_id || this.proyecto_actual_id == 'root') {
      this.cargarProyectosRaiz();
    } else {
      this.cargarProyectosDelProyectoActual();
      this.hacerCargaDeProductos();
    }
  }

  hacerCargaDeProductos() {
    this.productoService.getProductosByProyectoId(this.proyecto_actual_id).subscribe(
      (response: HttpResponse<Producto[]>) => {
        this.productos = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  cargarProyectosDelProyectoActual() {
    this.proyectoService.getProyectoById(this.proyecto_actual_id).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.proyecto_actual = response.body;
        this.cargarProyectosDelProyectoPadre();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
        this.router.navigate(['/login']);
      }
    )
  }

  cargarProyectosRaiz() {
    this.proyectoService.getAllRootProyects().subscribe(
      (response: HttpResponse<Proyecto[]>) => {
        this.subproyectos = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    )
  }

  cargarProyectosDelProyectoPadre() {
    this.proyectoService.getProyectosByParentId(this.proyecto_actual_id).subscribe(
      (response: HttpResponse<Proyecto[]>) => {
        this.subproyectos = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  navegarAlProyecto(proyecto_a_navegar_id: String) {
    this.subproyectos = [];
    this.productos = [];
    this.proyecto_actual = undefined;
    this.router.navigate(['/admintools/proyectos', proyecto_a_navegar_id]);
  }

}
