import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService, ProductoService, SvgRestService, ToasterService } from 'src/app/_services';
import { Proyecto, Svg, Poligono, Punto, Producto } from 'src/app/_models';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Image } from '../../../../_digiall-components/svgtool/models/image.model';
import { Md5 } from "md5-typescript";

declare var svgPanZoom: any;
declare var mobileEventsHandler: any;

@Component({
  selector: 'app-svgtool',
  templateUrl: './svgtool.component.html',
  styleUrls: ['./svgtool.component.scss']
})
export class SvgtoolComponent implements OnInit {
  @ViewChild('svgTag') private svgTag: ElementRef;

  public proyecto_id: string;
  public proyecto: Proyecto;
  public subproyectos: Proyecto[];
  public productos: Producto[];

  public svg: Svg;
  public image: Image;

  public idSvgTag: any;

  public isDrawing: boolean;

  public objPolygon: Poligono;
  public stringPoints: string;

  public poligonoUUIDSeleccionado: number;
  public subproyectoAnteriormenteLigado: Proyecto;
  public productoAnteriormenteLigado: Producto;
  public subproyectoALigar: Proyecto;
  public productoALigar: Producto;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private productoService: ProductoService,
    private svgService: SvgRestService,
    private toaster: ToasterService,
  ) { 
    this.isDrawing = false;
    this.initializePolygon();
    this.route.params.subscribe(
      params => {
        this.proyecto_id = params.proyecto_id;
        this.cargarProyecto();
      });
  }

  ngOnInit() {
  }

  navegarAlProyecto(proyecto_a_navegar_id: String) {
    this.router.navigate(['/admintools/proyectos', proyecto_a_navegar_id]);
  }

  cargarProyecto() {
    this.proyectoService.getProyectoById(this.proyecto_id).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.proyecto = response.body;
        if (this.proyecto.svgId) {
          this.cargarSvg(this.proyecto.svgId);
        }
        this.cargarSubproyectos();
        this.cargarProductos();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  cargarSubproyectos() {
    this.proyectoService.getProyectosByParentId(this.proyecto_id).subscribe(
      (response: HttpResponse<Proyecto[]>) => {
        this.subproyectos = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  cargarProductos() {
    this.productoService.getProductosByProyectoId(this.proyecto_id).subscribe(
      (response: HttpResponse<Producto[]>) => {
        this.productos = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  uploadImage(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.onload = () => {
        this.image.srcB64 = String(reader.result);
        this.image.name = file.name;
        this.image.size = file.size;
        this.image.type = file.type;
      };
      this.image = new Image();
      reader.readAsDataURL(file);
    }
  }

  loadImagePreview(event: any) {
    this.image.originalWidth = event.currentTarget.naturalWidth;
    this.image.originalHeight = event.currentTarget.naturalHeight;
  }

  reiniciarCarga() {
    this.image = undefined;
  }

  generarSvgDesdeImagen() {
    this.svg = new Svg();
    this.svg.width = this.image.originalWidth;
    this.svg.height = this.image.originalHeight;
    this.svg.imagen = this.image.srcB64;
    this.svg.imagenContentType = this.image.type;
    this.svg.poligonos = [];
    setTimeout(() => {
      this.addSettingsZoom();
    }, 900);
  }

  cargarSvg(svg_id: string) {
    this.svgService.getSvgById(svg_id).subscribe(
      (response: HttpResponse<Svg>) => {
        this.svg = response.body;
        setTimeout(() => {
          this.addSettingsZoom();
        }, 900);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  addSettingsZoom() {
    this.idSvgTag = svgPanZoom('#svgTag', {
      zoomEnabled: true,
      controlIconsEnabled: false,
      dblClickZoomEnabled: false,
      center: true,
      customEventsHandler: mobileEventsHandler
    });
    //
    this.svgTag.nativeElement.childNodes[0].setAttribute('transform', 'matrix(0 0 0 0 0 0)');
    this.svgTag.nativeElement.childNodes[0].setAttribute('style', 'transform: matrix(0, 0, 0, 0, 0, 0)');
  }

  initializePolygon() {
    this.objPolygon = new Poligono();
    this.objPolygon.arregloPuntos = [];
    this.objPolygon.id = '';
    this.stringPoints = '';
  }

  beginDraw() {
    if (this.isDrawing){
      return;
    }
    this.isDrawing = true;
    this.poligonoUUIDSeleccionado = undefined;
    this.initializePolygon();
  }

  stopDraw() {
    if (!this.isDrawing) {
      return;
    }
    this.isDrawing = false;
    this.guardarPoligonoEnSvg();
  }

  clickInSvg(event: any) {
    if (this.isDrawing) {
      const objG = this.svgTag.nativeElement.querySelector('g');
      const pt = this.svgTag.nativeElement.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const newPoint = pt.matrixTransform(objG.getScreenCTM().inverse());
      this.addPoint(newPoint.x, newPoint.y);
    } else {
      this.poligonoUUIDSeleccionado = undefined;
    }
  }

  addPoint(pX, pY) {
    const objPunto: Punto = new Punto();
    objPunto.x = pX;
    objPunto.y = pY;
    this.objPolygon.arregloPuntos.push(objPunto);
    this.paintInSvg();
  }

  undoPoint() {
    if (!this.isDrawing) {
      return;
    }
    if (this.objPolygon.arregloPuntos.length > 0) {
      this.objPolygon.arregloPuntos.splice(this.objPolygon.arregloPuntos.length - 1, 1);
      this.paintInSvg();
    }
  }

  paintInSvg() {
    this.stringPoints = '';
    if (this.objPolygon.arregloPuntos.length !== 0) {
      for (let i = 0; i < this.objPolygon.arregloPuntos.length; i++) {
        this.stringPoints += this.objPolygon.arregloPuntos[i].x + ',' + this.objPolygon.arregloPuntos[i].y + ' ';
      }
    }
  }

  guardarPoligonoEnSvg() {
    const polygonToSave = new Poligono();
    polygonToSave.genUid = Date.now();
    polygonToSave.arregloPuntos = this.objPolygon.arregloPuntos;
    polygonToSave.puntos = this.stringPoints;
    this.svg.poligonos.push(polygonToSave);
    this.initializePolygon();
  }

  poligonoSeleccionado(poligono_uuid: number) {
    if (this.isDrawing) {
      return;
    }
    this.poligonoUUIDSeleccionado = poligono_uuid;
  }

  // 'rgba(2,134,222,0.72)'
  poligonoColorFondo(poligono_uuid: number): string {
    if (this.poligonoUUIDSeleccionado && this.poligonoUUIDSeleccionado === poligono_uuid) {
      return 'rgba(2,134,222,1.00)';
    }
    else {
      return 'rgba(2,134,222,0.60)';
    }
  }

  deletePolygon() {
    if (!this.poligonoUUIDSeleccionado) {
      return;
    }
    if (!(this.svg.poligonos.length > 0)) {
      return;
    }
    let indexABorrar = -1;
    for (let i = 0; i < this.svg.poligonos.length ; i++) {
      const poligono = this.svg.poligonos[i];
      if (poligono.genUid === this.poligonoUUIDSeleccionado) {
        indexABorrar = i;
        break;
      }
    }
    if (indexABorrar > -1) {
      this.svg.poligonos.splice(indexABorrar, 1);
    }
    this.linkPolygon();
    this.subproyectoALigar = undefined;
    this.productoALigar = undefined;
    this.removerLigaAnterior();
    this.saveSvg();
  }

  linkPolygon() {
    if (!this.poligonoUUIDSeleccionado) {
      return;
    }
    if (this.subproyectos) {
      for (const proyecto of this.subproyectos) {
        if (proyecto.idSeccion && proyecto.idSeccion === String(this.poligonoUUIDSeleccionado)) {
          this.subproyectoAnteriormenteLigado = proyecto;
          this.subproyectoALigar = proyecto;
        }
      }
    }
    if (this.productos) {
      for (const producto of this.productos) {
        if (producto.idSeccion && producto.idSeccion === String(this.poligonoUUIDSeleccionado)) {
          this.productoAnteriormenteLigado = producto;
          this.productoALigar = producto;
        }
      }
    }
  }

  cancelarLigaDelPoligono() {
    this.reiniciarVariablesLigaDePoligono();
  }

  reiniciarVariablesLigaDePoligono() {
    this.subproyectoAnteriormenteLigado = undefined;
    this.subproyectoALigar = undefined;
    this.productoAnteriormenteLigado = undefined;
    this.productoALigar = undefined;
  }

  configurarSubProyectoALigar(proyecto: Proyecto) {
    this.productoALigar = undefined;
    this.subproyectoALigar = proyecto;
  }

  configurarProductoALigar(producto: Producto) {
    this.subproyectoALigar = undefined;
    this.productoALigar = producto;
  }

  cambiarLigaDelPoligono() {
    if (!this.productoALigar && !this.subproyectoALigar) {
      return;
    }
    if (this.subproyectoALigar && this.subproyectoAnteriormenteLigado && 
      this.subproyectoALigar.id === this.subproyectoAnteriormenteLigado.id) {
      this.reiniciarVariablesLigaDePoligono();
      return;
    }
    if (this.productoALigar && this.productoAnteriormenteLigado && 
      this.productoALigar.id === this.productoAnteriormenteLigado.id) {
      this.reiniciarVariablesLigaDePoligono();
      return;
    }
    this.removerLigaAnterior();
    this.guardarNuevaLiga();
  }

  removerLigaAnterior() {
    if (this.subproyectoAnteriormenteLigado) {
      this.subproyectoAnteriormenteLigado.idSeccion = undefined;
      this.proyectoService.editarProyecto(this.subproyectoAnteriormenteLigado).subscribe(
        (response: HttpResponse<Proyecto>) => {
          this.reiniciarVariablesLigaDePoligono();
          this.guardarNuevaLiga();
        },
        (error: HttpErrorResponse) => {
          this.reiniciarVariablesLigaDePoligono();
          this.toaster.error(error.status + ' mensaje: ' + error.error.message);
        }
      );
    }
    if (this.productoAnteriormenteLigado) {
      this.productoAnteriormenteLigado.idSeccion = undefined;
      this.productoService.editarProducto(this.productoAnteriormenteLigado).subscribe(
        (response: HttpResponse<Producto>) => {
          this.reiniciarVariablesLigaDePoligono();
          this.guardarNuevaLiga();
        },
        (error: HttpErrorResponse) => {
          this.reiniciarVariablesLigaDePoligono();
          this.toaster.error(error.status + ' mensaje: ' + error.error.message);
        }
      );
    }
  }

  guardarNuevaLiga() {
    if (this.subproyectoALigar) {
      this.subproyectoALigar.idSeccion = String(this.poligonoUUIDSeleccionado);
      this.proyectoService.editarProyecto(this.subproyectoALigar).subscribe(
        (response: HttpResponse<Proyecto>) => {
          this.reiniciarVariablesLigaDePoligono();
          this.toaster.success('Área relacionada exitosamente');
        },
        (error: HttpErrorResponse) => {
          this.reiniciarVariablesLigaDePoligono();
          this.toaster.error(error.status + ' mensaje: ' + error.error.message);
        }
      );
    }
    if (this.productoALigar) {
      this.productoALigar.idSeccion = String(this.poligonoUUIDSeleccionado);
      this.productoService.editarProducto(this.productoALigar).subscribe(
        (response: HttpResponse<Producto>) => {
          this.reiniciarVariablesLigaDePoligono();
          this.toaster.success('Área relacionada exitosamente');
        },
        (error: HttpErrorResponse) => {
          this.reiniciarVariablesLigaDePoligono();
          this.toaster.error(error.status + ' mensaje: ' + error.error.message);
        }
      );
    }
  }

  saveSvg() {
    if (this.isDrawing) {
      this.isDrawing = false;
    }
    if (!this.proyecto.svgId) {
      this.saveNewSvg();
    } else {
      this.updateSvg();
    }
  }

  saveNewSvg() {
    this.svg.nombre = 'svg-test';
    this.svg.codigoContentType = 'image/svg';
    const ngcontentProp = this.svgTag.nativeElement.outerHTML.split(' ')[1];
    this.svg.codigo = btoa(this.svgTag.nativeElement.outerHTML.replace(ngcontentProp, ''));
    this.svgService.createSvg(this.svg).subscribe(
      (response: HttpResponse<Svg>) => {
        this.svg = response.body;
        this.ponerSvgAlProyecto(response.body.id);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  updateSvg() {
    this.svgService.updateSvg(this.svg).subscribe(
      (response: HttpResponse<Svg>) => {
        this.toaster.success('SVG guardado');
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  ponerSvgAlProyecto(svg_id: string) {
    this.proyecto.svgId = svg_id;
    this.proyectoService.editarProyecto(this.proyecto).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.toaster.success('SVG guardado');
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

}
