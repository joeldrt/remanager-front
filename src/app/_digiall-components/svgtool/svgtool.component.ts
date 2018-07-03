import {AfterViewInit, Component, OnInit} from '@angular/core';
// Models
import { Image } from './models/image.model';
import { SvgToolService } from './services/svgtool.service';
import { DtoSvgModel } from '../../_models/dto.svg.model';

// DataTest
import { SVG } from './dataJson/svg-data';

// Services
import { SvgsService } from '../../_services';

@Component({
  selector: 'app-svgtool',
  templateUrl: './svgtool.component.html',
  styleUrls: ['./svgtool.component.sass']
})
export class SvgToolComponent implements OnInit, AfterViewInit {


  public image: Image;
  public imageSvg: Image;
  public sectionShow: string;
  public widthContainer: number;
  public infoContainer: any;
  public objSvg = SVG;

  constructor(private svgToolService: SvgToolService,
              private _svgsService: SvgsService
  ) {
    this.sectionShow = 'section-1';
  }

  ngOnInit() {
    this.image = new Image();
    this.imageSvg = new Image();
    this.infoContainer = {
      width: 0,
      height: 0
    };
    this.widthContainer = 0;
  }

  ngAfterViewInit() {
    this.widthContainer = document.getElementById('dgContainerSvgTool').clientWidth;
  }

  /* Opción Cargar Imagen*/
  openLoadingImage() {
    this.sectionShow = 'section-2';
  }

  uploadImage(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image.srcB64 = reader.result;
        this.image.name = file.name;
        this.image.size = file.size;
        this.image.type = file.type;
      };
    }
  }// end - uploadImage(event)

  acceptImage() {
    const newVals =
      this.getNewWidthHeight(this.image.originalWidth, this.image.originalHeight, (this.widthContainer / 2), (this.widthContainer));
    this.image.widthContent = newVals.width;
    this.image.heightContent = newVals.height;
    this.imageSvg = this.image;
    this.sectionShow = 'section-3';
    this.imageSvg.typeLoad = 'new';
  }

  loadImagePreview(event) {
    this.image.originalWidth = event.currentTarget.naturalWidth;
    this.image.originalHeight = event.currentTarget.naturalHeight;
  }// end - loadImagePreview(event)

  /* Opción Editar PV*/
  editPV() {
    this.sectionShow = 'section-3';
    this.imageSvg.typeLoad = 'edit';
    setTimeout(() => {
      this.toAssignValuesToPV(this.objSvg);
    }, 600);
  }

  /* Opción Consultar PV*/
  visualizePV() {
    this.sectionShow = 'section-3';
    this.imageSvg.typeLoad = 'view';
    setTimeout(() => {
      this.toAssignValuesToPV(this.objSvg);
    }, 900);
  }

  /*
   * Generic's
  */
  getNewWidthHeight(widthImage, heightImage, widthContent, heightContent): any {
    let newVals = {'width': 0, 'height': 0};
    if (widthImage > heightImage) {
      newVals.height = heightImage * (widthContent / widthImage);
      newVals.width = widthContent;
    }
    else {
      newVals.width = widthImage * (heightContent / heightImage);
      newVals.height = heightContent;
    }
    return newVals;
  }

  toAssignValuesToPV(oSvg) {
    if (oSvg != null) {
      this.imageSvg.srcB64 = 'data:' + oSvg.imagenContentType + ';base64,' + oSvg.imagen;
      this.imageSvg.widthContent = oSvg.width;
      this.imageSvg.heightContent = oSvg.height;
      this.imageSvg.originalWidth = oSvg.width;
      this.imageSvg.originalHeight = oSvg.height;
      this.imageSvg.name = '';
      this.imageSvg.size = 0;
      this.imageSvg.type = oSvg.imagenContentType; // Puede utilizarse para indicar opción
      this.svgToolService.sendSvg(oSvg);
    }
  }/*end - toAssignValuesToPV*/

  decideValuesContainerSvg() {
    console.log('width Container : ' + event);
  }

}/*end - class*/


