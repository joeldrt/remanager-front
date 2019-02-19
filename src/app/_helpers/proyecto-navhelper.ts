import { Injectable } from '@angular/core';
import {Proyecto} from '../_models/proyecto';

@Injectable()
export class ProyectoNavhelper {

  private pila_proyectos: Proyecto[];

  constructor() {
    this.limpiarNavegacion();
  }

  public apilarProyecto(proyecto: Proyecto) {
    this.pila_proyectos.push(proyecto);
  }

  public ultimoProyectoApilado(): Proyecto {
    if (this.pila_proyectos.length <= 0) {
      return null;
    }
    return this.pila_proyectos[this.pila_proyectos.length - 1];
  }

  public removerDeLaPila(): string {
    const proy = this.ultimoProyectoApilado();
    this.pila_proyectos.pop();
    if (proy) {
      return proy.padreId;
    }
    return undefined;
  }

  public removerDesde(proyecto: Proyecto) {
    const new_pila_proyectos = new Array<Proyecto>();
    for (const current of this.pila_proyectos) {
      if (proyecto.id === current.id) {
        new_pila_proyectos.push(current);
        break;
      }
      new_pila_proyectos.push(current);
    }
    this.pila_proyectos = new_pila_proyectos;
  }

  public limpiarNavegacion() {
    this.pila_proyectos = new Array<Proyecto>();
  }

  public obtenerPila(): Proyecto[] {
    if (!this.pila_proyectos) {
      return [];
    }
    return Object.assign([], this.pila_proyectos);
  }
}
