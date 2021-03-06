import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Proyecto, Producto } from '../../../_models';
import { ProyectoService, ProductoService, ToasterService } from '../../../_services';
import {ProyectoNavhelper, FooterMenuhelper, HeaderHelper} from '../../../_helpers';
import {ProductUtils} from '../../../_utils/product.utils';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit, OnDestroy {

  showing_project: Proyecto;
  proyectos: Proyecto[];
  productos: Producto[];
  loading = false;

  constructor(
    private proyectoService: ProyectoService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoNavhelper: ProyectoNavhelper,
    private productoService: ProductoService,
    private footerMenu: FooterMenuhelper,
    private headerHelper: HeaderHelper,
    private productUtils: ProductUtils,
  ) {
  }

  ngOnInit() {
    this.doNavigationBaby();
  }

  ngOnDestroy() {
    this.footerMenu.clearButtons('/proyectos');
  }

  private footerButtonSetup() {
    if (!this.footerMenu.getMenu('/proyectos')) {
      this.footerMenu.addButtonFromValues('/proyectos', 'plano', 'fa  fa-map-o', '/proyectos/mapa');
      this.footerMenu.addButtonFromValues('/proyectos', 'lista', 'fa  fa-list-ul', '/proyectos');
    }
    this.footerMenu.sendMenuRequest('/proyectos');
  }

  private setCurrentViewInfo() {
    if (!this.proyectoNavhelper.ultimoProyectoApilado()) {
      this.showing_project = new Proyecto();
      this.showing_project.nombre = 'Inicio';
      this.headerHelper.sendHeaderTitleRequest('Proyectos');
      return;
    }
    this.showing_project = this.proyectoNavhelper.ultimoProyectoApilado();
    // this.headerHelper.sendHeaderTitleRequest(this.showing_project.nombre);
    this.headerHelper.sendHeaderTitleRequest('Proyectos');
  }

  private doNavigationBaby() {
    this.loading = true;
    this.footerButtonSetup();
    this.setCurrentViewInfo();
    this.clearProyectosAndProductos();
    if (!this.proyectoNavhelper.ultimoProyectoApilado()) {
      this.proyectoService.getAllRootProyects().subscribe(
        (value: HttpResponse<Proyecto[]>) => {
          if (value && value.body) {
            this.proyectos = value.body;
            this.loading = false;
          }
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.toasterService.error('status: ' + error.status + ' message: ' + error.error.message);
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
        this.loading = false;
        this.toasterService.error('status: ' + error.status + ' message: ' + error.error.message);
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
            this.loading = false;
          }
        },
        (error: HttpErrorResponse) => {
          this.toasterService.error('status: ' + error.status + ' message: ' + error.error.message);
          this.loading = false;
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
    this.router.navigate(['/productos', producto.id], { queryParams: { routeToReturn: '/proyectos'}});
  }

  colorByStatus(status: string): string {
    return this.productUtils.colorByStatus(status);
  }
}
