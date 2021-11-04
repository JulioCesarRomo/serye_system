import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministracionClientesActivosComponent } from './panel-administracion-clientes-activos.component';

describe('PanelAdministracionClientesActivosComponent', () => {
  let component: PanelAdministracionClientesActivosComponent;
  let fixture: ComponentFixture<PanelAdministracionClientesActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdministracionClientesActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdministracionClientesActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
