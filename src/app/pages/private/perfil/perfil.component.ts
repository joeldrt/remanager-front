import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AccountService, ToasterService } from '../../../_services';
import { User } from '../../../_models';
import {ProfileHelper} from '../../../_helpers';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public user: User;
  public isEditing: boolean;

  constructor(
    private accountService: AccountService,
    private toasterService: ToasterService,
    private profileHelper: ProfileHelper
  ) {

  }

  ngOnInit() {
    this.getAccount();
  }// end - ngOnInit

  // --- Functions

  editForm() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.user = JSON.parse(localStorage.getItem('account'));
  }

  saveForm() {
    this.accountService.updateAccount(this.user).subscribe(
      (success: HttpResponse<any>) => {
        if (success.status === 200) {
          this.isEditing = false;
          this.getAccount();
          this.toasterService.success('Información actualizada');
          this.profileHelper.sendProfileChangeRequest(this.user.id);
        } else {
          this.toasterService.error('Error: ' + success.statusText);
        }
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error('Error: ' + error.message);
      }
    );
  }// end - saveForm

  getAccount() {
    this.accountService.getAccount().subscribe(
      (response: HttpResponse<User>) => {
        this.user = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toasterService.error(error.message);
      });
  }// end - getAccount

}
