import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { FileEnvelope } from '../../../_dgtools_models';
import { FileService } from '../../../_dgtools_services';

import { ToasterService } from '../../../_services';

@Component({
  selector: 'app-dgtools',
  templateUrl: './dgtools.component.html',
  styleUrls: ['./dgtools.component.scss']
})
export class DgtoolsComponent implements OnInit {

  @ViewChild('uploadfile_field') image_input_field: ElementRef;

  file_folder: string;
  file_envelopes: Array<FileEnvelope>;
  is_uploading_in_process = false;
  uploaded_files: string[];

  constructor(
    private fileService: FileService,
    private toaster: ToasterService,
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
            reader.result.split(',')[1]
          );
          this.file_envelopes.push(file_envelope);
        };
      }
    }
  }

  uploadFiles() {
    if (!this.file_folder || this.file_folder === '') {

    }
    if (!this.file_envelopes || this.file_envelopes.length <=0) {
      return;
    }
    this.is_uploading_in_process = true;
    this.fileService.uploadFiles(this.file_folder, this.file_envelopes).subscribe(
      (response: HttpResponse<string[]>) => {
        if (response && response.body) {
          this.uploaded_files = response.body;
          for (let url in this.uploaded_files) {
            this.toaster.success(url);
          }
        }
      },
      (error: HttpErrorResponse) => {
        this.toaster.error('status' + error.status + ' message: ' + error.message);
      }
    );
  }

}
