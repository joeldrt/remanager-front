import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Proyecto, Producto } from '../../../_models';
import { ProyectoService, ProductoService, ToasterService } from '../../../_services';
import { ProyectoNavhelper, FooterMenuhelper } from '../../../_helpers';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

  proyectos: Proyecto[];
  productos: Producto[];

  constructor(
    private proyectoService: ProyectoService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoNavhelper: ProyectoNavhelper,
    private productoService: ProductoService,
    private footerMenuHelper: FooterMenuhelper,
  ) {
    this.footerButtonSetup();
  }

  ngOnInit() {
    this.doNavigationBaby();
  }

  private footerButtonSetup() {
    if (this.footerMenuHelper.getMenu('/proyectos')) {
      return;
    }
    this.footerMenuHelper.addButtonFromValues('/proyectos', 'mapa', 'fa  fa-map-o', '/proyectos/mapa');
    this.footerMenuHelper.addButtonFromValues('/proyectos', 'lista', 'fa  fa-list-ul', '/proyectos');
  }

  private doNavigationBaby() {
    this.clearProyectosAndProductos();
    if (!this.proyectoNavhelper.ultimoProyectoApilado()) {
      this.proyectoService.getAllRootProyects().subscribe(
        (value: HttpResponse<Proyecto[]>) => {
          if (value && value.body) {
            this.proyectos = value.body;
          }
        },
        (error: HttpErrorResponse) => {
          this.toasterService.error('Error ' + error.status + ': ' + error.message);
          this.proyectoNavhelper.limpiarNavegacion();
          this.router.navigate(['/login']);
        });
      return;
    }
    this.proyectoService.getProyectosByParentId(this.proyectoNavhelper.ultimoProyectoApilado().id).subscribe(
      (value: HttpResponse<Proyecto[]>) => {
        if (value && value.body) {
          this.proyectos = value.body;
          this.findProductos(this.proyectoNavhelper.ultimoProyectoApilado());
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error('Error ' + error.status + ': ' + error.message);
        this.proyectoNavhelper.limpiarNavegacion();
        this.router.navigate(['/login']);
      });
  }

  findProductos(proyecto: Proyecto) {
    if (proyecto && proyecto.id) {
      this.productoService.getProductosByProyectoId(proyecto.id).subscribe(
        (value: HttpResponse<Producto[]>) => {
          if (value && value.body) {
            this.productos = value.body;
          }
        },
        (error: HttpErrorResponse) => {
          this.toasterService.error('Error ' + error.status + ': ' + error.message);
        });
    }
  }

  clearProyectosAndProductos() {
    this.proyectos = new Array<Proyecto>();
    this.productos = new Array<Producto>();
  }

  entrarAProyecto(projectToShow: Proyecto) {
    this.proyectoNavhelper.apilarProyecto(projectToShow);
    this.doNavigationBaby();
  }

  navegarAnterior() {
    const newProjectToShowId = this.proyectoNavhelper.removerDeLaPila();
    this.doNavigationBaby();
  }

  shouldShowGoBack() {
    if (this.proyectoNavhelper.ultimoProyectoApilado()) {
      return true;
    }
    return false;
  }

  obtenerPiladeProyectos(): Proyecto[] {
    return this.proyectoNavhelper.obtenerPila();
  }

  navegarEspecifico(proyecto: Proyecto) {
    this.proyectoNavhelper.removerDesde(proyecto);
    this.doNavigationBaby();
  }

  navegarAlInicio() {
    this.proyectoNavhelper.limpiarNavegacion();
    this.doNavigationBaby();
  }

  detalleDeProducto(producto: Producto) {
    this.router.navigate(['/productos', producto.id]);
  }

}
