import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPagosComponent } from './producto-pagos.component';

describe('ProductoPagosComponent', () => {
  let component: ProductoPagosComponent;
  let fixture: ComponentFixture<ProductoPagosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoPagosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
