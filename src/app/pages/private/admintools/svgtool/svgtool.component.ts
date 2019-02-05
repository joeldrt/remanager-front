import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectoService, SvgRestService, ToasterService } from 'src/app/_services';
import { Proyecto, Svg, Poligono, Punto } from 'src/app/_models';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Image } from '../../../../_digiall-components/svgtool/models/image.model';
import { Md5 } from "md5-typescript";

declare var svgPanZoom: any;

@Component({
  selector: 'app-svgtool',
  templateUrl: './svgtool.component.html',
  styleUrls: ['./svgtool.component.scss']
})
export class SvgtoolComponent implements OnInit {
  @ViewChild('svgTag') private svgTag: ElementRef;

  proyecto_id: string;
  proyecto: Proyecto;

  public svg: Svg;
  public image: Image;

  public idSvgTag: any;

  public isDrawing: boolean;

  public objPolygon: Poligono;
  public stringPoints: string;

  constructor(
    private proyectoService: ProyectoService,
    private svgService: SvgRestService,
    private route: ActivatedRoute,
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

  cargarProyecto() {
    this.proyectoService.getProyectoById(this.proyecto_id).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.proyecto = response.body;
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

  addSettingsZoom() {
    this.idSvgTag = svgPanZoom('#svgTag', {
      zoomEnabled: true,
      controlIconsEnabled: false,
      dblClickZoomEnabled: false,
      center: true
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

  poligonoSeleccionado(poligono_uuid: string) {
    alert(poligono_uuid);
  }

  saveSvg() {
    if (this.isDrawing){
      this.isDrawing = false;
    }
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

  ponerSvgAlProyecto(svg_id: string) {
    this.proyecto.svgId = svg_id;
    this.proyectoService.editarProyecto(this.proyecto).subscribe(
      (response: HttpResponse<Proyecto>) => {
        this.toaster.success('SVG guardado en el proyecto');
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

}
