declare var svgPanZoom: any;

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Proyecto, Producto, Svg } from '../../../_models';
import { SvgRestService, ProyectoService, ProductoService, ToasterService } from '../../../_services';
import { ProyectoNavhelper, FooterMenuhelper } from '../../../_helpers';
// import { Image } from '../../../_digiall-components/svgtool/models/image.model'; // visor de chucho
import { SvgToolService } from '../../../_digiall-components/svgtool/services/svgtool.service';

@Component({
  selector: 'app-proyectos-map',
  templateUrl: './proyectos-map.component.html',
  styleUrls: ['./proyectos-map.component.scss']
})
export class ProyectosMapComponent implements OnInit {

  proyectos: Proyecto[];
  productos: Producto[];
  svg: Svg;

  idSvgTag: any;
  should_svg_visible = false;
  // svg_tool_image: Image; // Visor de chucho

  constructor(
    private proyectoService: ProyectoService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router,
    private proyectoNavhelper: ProyectoNavhelper,
    private productoService: ProductoService,
    private footerMenuHelper: FooterMenuhelper,
    private svgService: SvgRestService,
    private svgToolService: SvgToolService,
  ) {
    this.footerButtonSetup();
  }

  ngOnInit() {
    this.doNavigationBaby();
  }

  private footerButtonSetup() {
    if (this.footerMenuHelper.getMenu('/proyectos/mapa')) {
      return;
    }
    this.footerMenuHelper.addButtonFromValues('/proyectos/mapa', 'mapa', 'fa  fa-map-o', '/proyectos/mapa');
    this.footerMenuHelper.addButtonFromValues('/proyectos/mapa', 'lista', 'fa  fa-list-ul', '/proyectos');
  }



  private doNavigationBaby() {
    this.clearProyectosAndProductosAndSvg();
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

    const svgIdToFind = this.proyectoNavhelper.ultimoProyectoApilado().svgId;
    if (!svgIdToFind || isNaN(svgIdToFind)) {
      // redirigimos a la vista de lista, tal vez ellos puedan mostrar lo requerido, porque svg no trae
      // pero mandamos una alerta a la vista por si acaso
      this.toasterService.warning('Sin Mapa que mostrar');
      this.router.navigate(['/proyectos']);
      return;
    }

    this.svgService.getSvgById(svgIdToFind).subscribe(
      (value: HttpResponse<Svg>) => {
        this.svg = value.body;
        setTimeout(() => {
          this.addSettingsZoom();
        }, 1000);
        // this.mappingToChuchosImage(value.body); //visor de chucho
        this.recuperarInformacionDeProyectosYProductos();
      },
      (error: HttpErrorResponse) => {
        // redirigimos a la vista de lista, tal vez ellos puedan mostrar lo requerido, porque svg no trae
        // pero mandamos una alerta a la vista por si acaso
        this.toasterService.warning('Sin Mapa que mostrar');
        this.router.navigate(['/proyectos']);
      });
  }

  svgImage(): string {
    return 'data:' + this.svg.imagenContentType + ';base64,' + this.svg.imagen;
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
  }

  addSettingsZoom() {
    this.idSvgTag = svgPanZoom('#svgTag', {
      zoomEnabled: true,
      preventMouseEventsDefault: false,
      dblClickZoomEnabled: false
    });
    this.should_svg_visible = true;
  }

/*
  Servicio ya funcionando de chucho para visualizar el svg
*/
/*  mappingToChuchosImage(oSvg: any) {
    if (oSvg != null) {
      this.svg_tool_image = new Image();
      this.svg_tool_image.srcB64 = 'data:' + oSvg.imagenContentType + ';base64,' + oSvg.imagen;
      this.svg_tool_image.widthContent = 574;
      this.svg_tool_image.heightContent = 794;
      this.svg_tool_image.originalWidth = 574;
      this.svg_tool_image.originalHeight = 794;
      this.svg_tool_image.name = '';
      this.svg_tool_image.size = 0;
      this.svg_tool_image.type = oSvg.imagenContentType; // Puede utilizarse para indicar opción
      this.svgToolService.sendSvg(oSvg);
    }
  }*/

  recuperarInformacionDeProyectosYProductos() {
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

  clearProyectosAndProductosAndSvg() {
    this.proyectos = new Array<Proyecto>();
    this.productos = new Array<Producto>();
    this.svg = null;
    this.should_svg_visible = false;
    // this.svg_tool_image = null; // visor de chucho
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

  }

}
