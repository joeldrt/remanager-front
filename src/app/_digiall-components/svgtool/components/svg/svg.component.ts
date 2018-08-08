declare var svgPanZoom: any;
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Component, OnInit, Input, Renderer2, ElementRef, ViewChild, OnDestroy, AfterViewInit} from '@angular/core';
import { Subscription } from 'rxjs';

// Models
import { Svg } from '../../models/svg.model';
import { Polygon } from '../../models/polygon.model';
import { Punto } from '../../models/punto.model';
import { Image } from '../../models/image.model';

// Services
import { SvgToolService } from '../../services/svgtool.service';
import { SvgsService, ToasterService } from '../../../../_services';

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.sass']
})
export class SvgComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('svgTag') private svgTag: ElementRef;
  @Input('imageSvg') public imageSvg: Image;
  @Input('controls') public haveControls: boolean;

  public subscriptionSvg: Subscription;
  private objSvg: Svg;
  public objPolygon: Polygon;
  public isVisibleMenu: boolean;
  public stringPoints: string;
  public arrayPolygons: Map<number, Polygon>;
  public descriptionActions: string;
  public idSvgTag: any;
  public isSaveSvg: boolean;
  public elPolygon: any;

  public stringStatusControls: string;
  public stringStatusZoom: string;
  public stringStatusSections: string;

  public tagPolySelected: any;
  public showModalDelete: boolean;
  public isSelectedPolygon: boolean;

  isDrawing: boolean;
  pX: string;
  pY: string;
  idSvg: number;
  isZoom: boolean;
  countZoom: number;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private svgToolService: SvgToolService,
    private _svgsService: SvgsService,
    private toaster: ToasterService,
  ) {

    this.isDrawing = false;
    this.pX = '';
    this.pY = '';
    this.initializePolygon();
    this.stringPoints = '';
    this.idSvg = Date.now();
    this.isVisibleMenu = true;
    this.descriptionActions = '';
    this.isZoom = false;
    this.countZoom = 100;
    this.isSaveSvg = false;
    this.tagPolySelected = null;
    this.showModalDelete = false;
    this.isSelectedPolygon = false;

    this.subscriptionSvg = this.svgToolService.svg$.subscribe(
      svg => {
        setTimeout(() => {
          this.addPolygonGet(svg);
        }, 1500);
      }
    );

    // Functions
    this.resetMsgsEstatus();
  }// end - constructor

  ngOnInit() {
    this.arrayPolygons = new Map();
  }// end - ngOnInit

  ngAfterViewInit() {
    this.objSvg = new Svg();
    setTimeout(() => {
      this.addSettingsZoom();
    }, 900);
  }// end - ngAfterViewInit

  ngOnDestroy() {
    this.subscriptionSvg.unsubscribe();
  }// end - ngOnDestroy

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

  doZoomIn(event) {
    event.preventDefault();
    this.isZoom = true;
    this.idSvgTag.zoomIn();
    this.countZoom++;
    this.stringStatusZoom = (this.countZoom) + '%';
  }

  doZoomOut(event) {
    event.preventDefault();
    this.isZoom = true;
    this.idSvgTag.zoomOut();
    this.countZoom--;
    this.stringStatusZoom = '' + (this.countZoom) + '%';
  }

  doZoomReset(event) {
    event.preventDefault();
    this.isZoom = false;
    this.idSvgTag.resetZoom();
    this.countZoom = 100;
    this.stringStatusZoom = '100%';
  }

  /**/
  beginDraw() {
    if (this.isDrawing){
      return;
    }
    this.isDrawing = true;
    this.initializePolygon();
  }

  clickInSvg(event) {
    if (this.isDrawing) {
      const objG = this.svgTag.nativeElement.querySelector('g');
      const pt = this.svgTag.nativeElement.createSVGPoint();
      pt.x = event.clientX;
      pt.y = event.clientY;
      const newPoint = pt.matrixTransform(objG.getScreenCTM().inverse());
      this.pX = newPoint.x;
      this.pY = newPoint.y;
      this.addPoint(this.pX, this.pY);
    }
  }

  addPoint(pX, pY) {
    const objPunto: Punto = new Punto();
    objPunto.x = pX;
    objPunto.y = pY;
    this.objPolygon.arregloPuntos.push(objPunto);
    this.paintInSvg();
  }

  undoLastPoint() {
    if (this.isDrawing && this.objPolygon.arregloPuntos.length > 0) {
      this.objPolygon.arregloPuntos.pop();
      this.paintInSvg();
    }
  }

  drawElements() {
    /*
    switch(typeEl){
        case 'polygon':
            console.log("Pintando un polygono :: ");
            this.elPolygon = document.createElementNS('http://www.w3.org/2000/svg', typeEl);
            this.elPolygon.setAttribute('puntos', puntos);
            this.elPolygon.setAttribute('fill', 'rgba(0,0,255,0.6)');
            this.elPolygon.addEventListener('click', this.onClickPolygon.bind(this));
            this.renderer.appendChild(this.svgTag.nativeElement, this.elPolygon);
            break;
    }
    */
  }

  paintInSvg() {
    this.stringPoints = '';
    if (this.objPolygon.arregloPuntos.length !== 0) {
      for (let i = 0; i < this.objPolygon.arregloPuntos.length; i++) {
        this.stringPoints += this.objPolygon.arregloPuntos[i].x + ',' + this.objPolygon.arregloPuntos[i].y + ' ';
      }
    }
  }

  /**/
  initializePolygon() {
    this.objPolygon = new Polygon();
    this.objPolygon.arregloPuntos = [];
    this.objPolygon.id = 0;
    this.objPolygon.status = '';
    this.stringPoints = '';
  }

  addPolygon() {
    if (this.isDrawing) {
      if (this.objPolygon.arregloPuntos.length >= 3) {
        const pointsString = this.createStringPoints(this.objPolygon.arregloPuntos);
        if (pointsString !== '') {
          const idPolygon = Date.now().toString();
          this.isDrawing = false;
          this.objPolygon.genUid = Date.now();
          this.arrayPolygons.set(this.objPolygon.genUid, this.objPolygon);
          this.createPolygon(idPolygon, pointsString);
          this.initializePolygon();
        }
      }
    }
  }

  addPolygonGet(svg) {
    if (!this.isDrawing) {
      this.objSvg.id = svg.id;
      if (svg.poligonos.length !== 0) {
        svg.poligonos.forEach(poligono => {
          this.arrayPolygons.set(poligono.genUid, poligono);

          const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
          poly.setAttribute('points', poligono.puntos);
          poly.setAttribute('fill', 'rgba(2,134,111,0.72)');
          poly.setAttribute('stroke', 'black');
          poly.setAttribute('stroke-width', '1px');
          poly.setAttribute('id', poligono.genUid);
          poly.addEventListener('click', this.onClickPolygon.bind(this));
          // this.renderer.appendChild(this.svgTag.nativeElement, poly);
          this.renderer.appendChild(this.svgTag.nativeElement.querySelector('g'), poly);
        });
      }
    }
  }

  createPolygon(idPolygon: string, stringPoints: string) {
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', stringPoints);
    poly.setAttribute('fill', 'rgba(2,134,222,0.72)');
    poly.setAttribute('stroke', 'black');
    poly.setAttribute('stroke-width', '1px');
    poly.setAttribute('id', idPolygon);
    poly.addEventListener('click', this.onClickPolygon.bind(this));
    // this.renderer.appendChild(this.svgTag.nativeElement, poly);
    this.renderer.appendChild(this.svgTag.nativeElement.querySelector('g'), poly);
  }

  saveSvg() {
    // validate if not is draw
    if (!this.isDrawing) {
      if (this.arrayPolygons.size > 0) {
        const objSvg = this.createBodyRequestSave();
        if (objSvg !== null) {

          switch (this.imageSvg.typeLoad) {
            case 'new':
              this._svgsService.create(objSvg)
                .subscribe(
                  (response: HttpResponse<any>) => {
                    console.log('Save - ' + response.status + ' ' + response.body);
                    this.toaster.info('Save - ' + response.status + ' ' + response.body);
                    this.isSaveSvg = true;
                    if (response.body) {
                      this.stringStatusControls = 'Se ha guardado el Svg ' + Date.now();
                    }
                  },
                  (error: HttpErrorResponse) => {
                    console.log('Test - ' + error.message);
                    this.toaster.error(error.message);
                  });
              break;
            case 'edit':
              this._svgsService.update(objSvg)
                .subscribe( (response: HttpResponse<any>) => {
                  console.log('Edit :' + response.status + ' ' + response.body);
                  this.toaster.info('Edit - ' + response.status + ' ' + response.body);
                }, (error: HttpErrorResponse) => {
                  console.log(error);
                  this.toaster.error(error.message);
                });
              break;
          } // end - switch
        }// end - if
      }// end -
    }
  } // end - saveSvg

  createBodyRequestSave(): Svg {
    const arrayPolygonsSend: Polygon[] = new Array();
    for (const poly of Array.from(this.arrayPolygons.entries())) {
      const polyToSend = new Polygon();
      polyToSend.genUid = poly[1].genUid;
      polyToSend.status = poly[1].status;
      polyToSend.arregloPuntos = poly[1].arregloPuntos;
      polyToSend.puntos = this.createStringPoints(poly[1].arregloPuntos);
      arrayPolygonsSend.push(polyToSend);
    }

    if (this.imageSvg.typeLoad === 'new') {
      this.objSvg = new Svg();
    }

    this.objSvg.nombre = 'svg-test';
    this.objSvg.codigoContentType = 'image/svg';
    this.objSvg.imagen = this.imageSvg.srcB64.split(',')[1];
    this.objSvg.imagenContentType = this.imageSvg.type;
    this.objSvg.width = this.imageSvg.widthContent;
    this.objSvg.height = this.imageSvg.heightContent;
    this.objSvg.poligonos = arrayPolygonsSend;
    const ngcontentProp = this.svgTag.nativeElement.outerHTML.split(' ')[1];
    this.objSvg.codigo = btoa(this.svgTag.nativeElement.outerHTML.replace(ngcontentProp, ''));

    return this.objSvg;
  }

  /* Click en uno de los polygonos creados
  /*
   * @param event
  */
  onClickPolygon(event) {
    if (!this.isDrawing) {
      let idPolygon = event.currentTarget.id.toString();
      let listTagsPolygons = this.svgTag.nativeElement.querySelectorAll('polygon');
      this.isSelectedPolygon = true;
      // Cambiando de color los polygonos al color por defecto
      if (listTagsPolygons.length > 1) {
        for (let poly of listTagsPolygons) {
          poly.setAttribute('fill', 'rgba(2,134,222,0.72)');
        }
        // Definiendo el color del polygono que nos sirve para pintar
        this.svgTag.nativeElement.getElementById('polygonTagDraw').setAttribute('fill', 'rgba(33,144,2,0.72)');
      }
      this.tagPolySelected = this.svgTag.nativeElement.getElementById(idPolygon);
      this.tagPolySelected.setAttribute('fill', 'rgba(222,2,24,0.72)');
      this.stringStatusSections = 'ID: ' + idPolygon;
    }
  }

  hiddenShowSection(optionSelected) {
    console.log('hiddenShowSection' + optionSelected);
    switch (optionSelected) {
      case 'edit':
      case 'create':
        this.isVisibleMenu = true;
        break;
      case 'show':
        this.isVisibleMenu = false;
        break;
    }
  }

  /**/
  resetMsgsEstatus(){
    this.stringStatusControls = 'Puede iniciar el pintado, dando click en pintar';
    this.stringStatusZoom = '100%';
    this.stringStatusSections = 'Al seleccionar una de las secciones pintadas, puede agregar su información';
  }
  /*
   * Eliminando el elemento seleccionado (this.tagPolySelected)
   * @param event
   */
  deletePolygon(event) {
    if (this.tagPolySelected != null) {
      this.arrayPolygons.delete(parseInt(this.tagPolySelected.id, 10));
      this.svgTag.nativeElement.getElementById(this.tagPolySelected.id).remove();
      this.isSelectedPolygon = false;
      this.tagPolySelected = null;
      this.showModalDelete = false;
    }
  }

  createStringPoints(puntosArray: Punto[]): string{
      let stringPoints = '';
      puntosArray.forEach(punto => {
        stringPoints += punto.x + ',' + punto.y + ' ';
      });
      return stringPoints;
  }

}// end - class SvgComponent
