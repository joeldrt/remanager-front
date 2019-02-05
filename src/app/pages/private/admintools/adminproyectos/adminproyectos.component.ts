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
  proyecto_actual_id: string;
  proyecto_actual: Proyecto;
  subproyectos: Proyecto[];
  productos: Producto[];
  subproyecto_nuevo: Proyecto;
  subproyecto_a_editar: Proyecto;
  producto_nuevo: Producto;

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
    this.subproyecto_nuevo = new Proyecto();
    this.producto_nuevo = new Producto();
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

  agregarProyecto() {
    if(!this.proyecto_actual) {
      this.subproyecto_nuevo.padreId = 'root';
    } else {
      this.subproyecto_nuevo.padreId = this.proyecto_actual.id;
    }
    this.subproyecto_nuevo.correoCreador = this.usuario_actual.email;
    this.subproyecto_nuevo.organizacionId = this.usuario_actual.organizationId;
    this.proyectoService.guardarProyecto(this.subproyecto_nuevo).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.subproyecto_nuevo = new Proyecto();
        this.hacerCargaDeProyectos();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  asignarProyectoAEditar(proyecto: Proyecto) {
    this.subproyecto_a_editar = proyecto;
  }

  editarProyecto() {
    if(!this.subproyecto_a_editar) {
      return;
    }
    this.proyectoService.editarProyecto(this.subproyecto_a_editar).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.subproyecto_a_editar = undefined;
        this.hacerCargaDeProyectos();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  borrarProyecto() {
    if(!this.subproyecto_a_editar) {
      return;
    }
    this.proyectoService.borrarProyecto(this.subproyecto_a_editar.id).subscribe(
      (response: HttpResponse<any>) => {
        this.subproyecto_a_editar = undefined;
        this.hacerCargaDeProyectos();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  agregarMapaAProyecto(proyecto_id: string) {
    this.router.navigate(['/admintools/svgtool/', proyecto_id]);
  }

}
