import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../_services';
import { User } from '../../../_models';

// Services
import { UserService } from '../../../_services';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public user: User
  public isEditing: boolean;

  constructor(
    private accountService: AccountService,
    private _userService: UserService
  ) {

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('account'));
    if(!this.user) {
      this.accountService.getAccount()
        .subscribe(
          user => {
            this.user = user;
          },
          error => {
            console.log(error);
          });
    }// end if
  }// end - ngOnInit

  // --- Functions

  editForm(){
    this.isEditing = true;
  }

  cancelEdit(){
    this.isEditing = false;
    this.user = JSON.parse(localStorage.getItem('account'));
  }

  saveForm(){
    this._userService.update(this.user).subscribe(
      success => {
        //debugger
        this.user = <User> success.body;
        localStorage.setItem('account', JSON.stringify(success.body));
        console.log('Se actualizo la información --- ' + success);
      },
      error => {
        console.log(error);
      }
    );
  }// end - saveForm

}
