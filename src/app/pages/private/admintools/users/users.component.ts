import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { UserService, ToasterService, AccountService } from 'src/app/_services';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usuario_actual: User;
  usuarios: User[]
  usuario_nuevo = new User();
  usuario_editar: User;
  password_editar: string;
  usuario_borrar: User;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.usuario_nuevo.authorities = [];
    this.usuario_actual = this.accountService.getStoredAccount();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.obtener().subscribe(
      (response: HttpResponse<User[]>) => {
        this.usuarios = response.body;
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  modificarActivado(id_usuario: string, status: boolean) {
    if (id_usuario === this.usuario_actual.id) {
      return;
    }
    if (!this.usuario_actual.authorities.includes('ROOT')) {
      return;
    }
    this.userService.modificarActivado(id_usuario, status).subscribe(
      (resposne: HttpResponse<any>) => {
        this.cargarUsuarios();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  agregarUsuario() {
    this.usuario_nuevo.organizationId = this.usuario_actual.organizationId;
    this.userService.create(this.usuario_nuevo).subscribe(
      (response: HttpResponse<User>) => {
        this.usuario_nuevo = new User();
        this.cargarUsuarios();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  setUsuarioEditar(usuario: User) {
    this.usuario_editar = usuario;
  }

  editarUsuario() {
    this.userService.update(this.usuario_editar).subscribe(
      (response: HttpResponse<User>) => {
        this.toaster.success('usuario ' + response.body.login + ' editado correctamente');
        this.usuario_editar = undefined;
        this.cargarUsuarios();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  preparacionCambioPassword() {
    this.password_editar = '';
  }

  editarPasswordUsuario(password: string) {
    this.userService.modificarPassword(this.usuario_editar.id, password).subscribe(
      (response: HttpResponse<any>) => {
        this.toaster.success('password de ' + this.usuario_editar.login + ' editado correctamente');
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

  setUsuarioBorrar(usuario: User) {
    this.usuario_borrar = usuario;
  }

  borrarUsuario() {
    this.userService.borrar(this.usuario_borrar.id).subscribe(
      (response: HttpResponse<any>) => {
        this.toaster.success('usuario ' + this.usuario_borrar.login + ' ha sido eliminado');
        this.usuario_borrar = undefined;
        this.cargarUsuarios();
      },
      (error: HttpErrorResponse) => {
        this.toaster.error(error.status + ' mensaje: ' + error.error.message);
      }
    );
  }

}
