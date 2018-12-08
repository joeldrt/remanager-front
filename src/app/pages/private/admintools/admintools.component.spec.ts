import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmintoolsComponent } from './admintools.component';

describe('AdmintoolsComponent', () => {
  let component: AdmintoolsComponent;
  let fixture: ComponentFixture<AdmintoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmintoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmintoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
