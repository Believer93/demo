import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OdcDetailsComponent } from './odc-details.component';

describe('OdcDetailsComponent', () => {
  let component: OdcDetailsComponent;
  let fixture: ComponentFixture<OdcDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdcDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OdcDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
