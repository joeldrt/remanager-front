import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { FileEnvelope } from '../../../_dgtools_models';
import { FileService } from '../../../_dgtools_services';

import { Contrato, PagoProgramado, PagoReal, TipoContrato } from '../../../_models';

import { DigiallDateUtils } from '../../../_utils';

import { ToasterService, ContratoService } from '../../../_services';

@Component({
  selector: 'app-dgtools',
  templateUrl: './dgtools.component.html',
  styleUrls: ['./dgtools.component.scss']
})
export class DgtoolsComponent implements OnInit {

  @ViewChild('uploadfileField') upload_file_field: ElementRef;

  file_folder: string;
  file_envelopes: Array<FileEnvelope>;
  is_uploading_in_process = false;
  uploaded_files: string[];

  constructor(
    private fileService: FileService,
    private toaster: ToasterService,
    private contratoService: ContratoService,
    private dateUtils: DigiallDateUtils
  ) { }

  ngOnInit() {
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.file_envelopes = new Array<FileEnvelope>();
      for (let index = 0; index < event.target.files.length; index++) {
        const reader = new FileReader();
        const file = event.target.files[index];
        reader.readAsDataURL(file);
        reader.onload = () => {
          const file_envelope = new FileEnvelope(
            file.name,
            file.type,
            (reader.result as string).split(',')[1]
          );
          this.file_envelopes.push(file_envelope);
        };
      }
    }
  }

  uploadFiles() {
    if (!this.file_folder || this.file_folder === '') {
      return;
    }
    if (!this.file_envelopes || this.file_envelopes.length <= 0) {
      return;
    }
    this.is_uploading_in_process = true;
    this.fileService.uploadFiles(this.file_folder, this.file_envelopes).subscribe(
      (response: HttpResponse<string[]>) => {
        this.is_uploading_in_process = false;
        if (response && response.body) {
          this.clearUploadForm();
          this.uploaded_files = response.body;
          for (const url of this.uploaded_files) {
            this.toaster.success(url);
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.clearUploadForm();
        this.is_uploading_in_process = false;
        this.toaster.error('status: ' + error.status + ' message: ' + error.error.message);
      }
    );
  }

  clearUploadForm() {
    this.upload_file_field.nativeElement.value = '';
    this.file_folder = '';
  }

  testContratoPagoReal() {
    const contrato = new Contrato();
    contrato.tipo = TipoContrato.BLOQUEO;
    contrato.clienteId = '5b6158e0878c8b2034f678a8';
    contrato.productoId = '5b64aed775916f6fdd8f2ee2';
    contrato.diasValidez = 15;
    contrato.pagosReales = new Array<PagoReal>();
    contrato.pagosProgramados = new Array<PagoProgramado>();

    const pago_real = new PagoReal();
    pago_real.monto = 150000;
    contrato.pagosReales.push(pago_real);

    const pago_programado = new PagoProgramado();
    pago_programado.monto = 350000;
    pago_programado.fechaCompromisoPago = this.dateUtils.toDate('2019-01-17T00:00:00.00Z');
    contrato.pagosProgramados.push(pago_programado);

    this.contratoService.create(contrato).subscribe(
      (response: HttpResponse<Contrato>) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status: ' + error.status + ' message: ' + error.error.message);
      }
    );
  }

}
