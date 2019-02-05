import {ProductUtils} from '../../../_utils/product.utils';

// declare var addSVGZoomingCapabilities: any;
declare var svgPanZoom: any;

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Proyecto, Producto, Svg, EstatusDeProducto } from '../../../_models';
import { SvgRestService, ProyectoService, ProductoService, ToasterService } from '../../../_services';
import { ProyectoNavhelper, FooterMenuhelper, HeaderHelper } from '../../../_helpers';
import { SvgToolService } from '../../../_digiall-components/svgtool/services/svgtool.service';


@Component({
  selector: 'app-proyectos-map',
  templateUrl: './proyectos-map.component.html',
  styleUrls: ['./proyectos-map.component.scss']
})
export class ProyectosMapComponent implements OnInit, OnDestroy {

  showing_project: Proyecto;
  proyectos: Proyecto[];
  productos: Producto[];
  svg: Svg;
  polygon_fill_color_map: Map<string, string>;
  polygon_fill_opacity: Map<string, string>;

  should_svg_visible = false;
  root_view = false;
  loading = false;

  constructor(
    private proyectoService: ProyectoService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoNavhelper: ProyectoNavhelper,
    private productoService: ProductoService,
    private footerMenu: FooterMenuhelper,
    private svgService: SvgRestService,
    private svgToolService: SvgToolService,
    private headerHelper: HeaderHelper,
    private productUtils: ProductUtils
  ) {
  }

  ngOnInit() {
    this.doNavigationBaby();
  }

  ngOnDestroy() {
    this.footerMenu.clearButtons('/proyectos/mapa');
  }

  // private footerButtonSetup() {
  //   if (!this.footerMenu.getMenu('/proyectos/mapa')) {
  //     this.footerMenu.addButtonFromValues('/proyectos/mapa', 'plano', 'fa  fa-map-o', '/proyectos/mapa');
  //     this.footerMenu.addButtonFromValues('/proyectos/mapa', 'lista', 'fa  fa-list-ul', '/proyectos');
  //   }
  //   this.footerMenu.sendMenuRequest('/proyectos/mapa');
  // }

  private setCurrentViewInfo() {
    this.root_view = false;
    if (!this.proyectoNavhelper.ultimoProyectoApilado()) {
      this.showing_project = new Proyecto();
      this.showing_project.nombre = 'Inicio';
      this.root_view = true;
      this.headerHelper.sendHeaderTitleRequest('Bienvendio');
      return;
    }
    this.showing_project = this.proyectoNavhelper.ultimoProyectoApilado();
    this.headerHelper.sendHeaderTitleRequest(this.showing_project.nombre);
  }

  private doNavigationBaby() {
    this.loading = true;
    // this.footerButtonSetup();
    this.setCurrentViewInfo();
    this.clearProyectosAndProductosAndSvg();
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

    const svgIdToFind = this.proyectoNavhelper.ultimoProyectoApilado().svgId;
    if (!svgIdToFind) {
      this.loading = false;
      // redirigimos a la vista de lista, tal vez ellos puedan mostrar lo requerido, porque svg no trae
      // pero mandamos una alerta a la vista por si acaso
      this.toasterService.warning('Sin Mapa que mostrar');
      this.router.navigate(['/proyectos']);
      return;
    }

    this.recuperarInformacionDeProyectosYProductos();
  }

  svgImage(): string {
    return 'data:' + this.svg.imagenContentType + ';base64,' + this.svg.imagen;
  }

  fillPolygonFillColorMap() {
    this.polygon_fill_color_map = new Map<string, string>();
    this.polygon_fill_opacity = new Map<string, string>();
    for (const proyecto of this.proyectos) {
      this.polygon_fill_color_map.set(proyecto.idSeccion, 'blue');
      this.polygon_fill_opacity.set(proyecto.idSeccion, '0.0');
    }
    for (const producto of this.productos) {
      this.polygon_fill_color_map.set(producto.idSeccion, this.productUtils.colorByStatus(producto.estatus.toString()));
      this.polygon_fill_opacity.set(producto.idSeccion, '0.8');
    }
  }

  getPolygonFillColor(uid: string) {
    return this.polygon_fill_color_map.get(String(uid)) ? this.polygon_fill_color_map.get(String(uid)) : 'white';
  }

  getPolygonFillOpacity(uid: string) {
    return this.polygon_fill_opacity.get(String(uid)) ? this.polygon_fill_opacity.get(String(uid)) : '0.0';
  }

  retrieveSvg(svgIdToFind: string) {
    this.svgService.getSvgById(String(svgIdToFind)).subscribe(
      (value: HttpResponse<Svg>) => {
        this.svg = value.body;
        setTimeout(() => {
          this.loading = false;
          this.addSettingsZoom();
          // addSVGZoomingCapabilities('#svgTag', this.svg.width, this.svg.height);
        }, 1000);
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        // redirigimos a la vista de lista, tal vez ellos puedan mostrar lo requerido, porque svg no trae
        // pero mandamos una alerta a la vista por si acaso
        this.toasterService.warning('Sin Mapa que mostrar');
        this.router.navigate(['/proyectos']);
      });
  }

  addSettingsZoom() {
    svgPanZoom('#svgTag', {
      zoomEnabled: true,
      controlIconsEnabled: false,
      dblClickZoomEnabled: false,
      center: true
    });
  }

  navigateToItem(getUid: string) {
    for (const proyecto of this.proyectos) {
      if (proyecto.idSeccion && String(proyecto.idSeccion) === String(getUid)) {
        this.entrarAProyecto(proyecto);
        return;
      }
    }
    for (const producto of this.productos) {
      if (producto.idSeccion && String(producto.idSeccion) === String(getUid)) {
        this.detalleDeProducto(producto);
        return;
      }
    }
    this.toasterService.warning(getUid);
  }

  recuperarInformacionDeProyectosYProductos() {
    this.root_view = false;
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
            this.fillPolygonFillColorMap();
            this.retrieveSvg(this.proyectoNavhelper.ultimoProyectoApilado().svgId);
          }
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.toasterService.error('status: ' + error.status + ' message: ' + error.error.message);
        });
    }
  }

  clearProyectosAndProductosAndSvg() {
    this.proyectos = new Array<Proyecto>();
    this.productos = new Array<Producto>();
    this.svg = null;
    this.should_svg_visible = false;
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

  obtenerNombreDelProyectoDesplegado(): string {
    if (!this.proyectoNavhelper.ultimoProyectoApilado()) {
      return 'PROYECTO SIN NOMBRE!!!!';
    }
    return this.proyectoNavhelper.ultimoProyectoApilado().nombre;
  }

  detalleDeProducto(producto: Producto) {
    this.router.navigate(['/proyectos/mapa/producto', producto.id]);
  }

}
