import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgtoolComponent } from './svgtool.component';

describe('SvgtoolComponent', () => {
  let component: SvgtoolComponent;
  let fixture: ComponentFixture<SvgtoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgtoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
