import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCorridaComponent } from './producto-corrida.component';

describe('ProductoCorridaComponent', () => {
  let component: ProductoCorridaComponent;
  let fixture: ComponentFixture<ProductoCorridaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoCorridaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoCorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
