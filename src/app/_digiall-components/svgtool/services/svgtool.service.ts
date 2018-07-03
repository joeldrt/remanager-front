import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Svg } from '../models/svg.model';

@Injectable({
  providedIn: 'root'
})
export class SvgToolService {

  // Observable string sources
  private svgSource = new Subject<Svg[]>();
  private optionSelectedSource = new Subject<string>();

  // Observable string streams
  svg$ = this.svgSource.asObservable();
  optionSelected$ = this.optionSelectedSource.asObservable();

  constructor() { }

  // Service message commands
  sendOptionSelected(selection: string) {
    this.optionSelectedSource.next(selection);
  }

  sendSvg(svg: any) {
    this.svgSource.next(svg);
  }

}
