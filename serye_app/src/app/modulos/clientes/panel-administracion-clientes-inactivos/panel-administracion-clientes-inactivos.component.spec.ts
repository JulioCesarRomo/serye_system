import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministracionClientesInactivosComponent } from './panel-administracion-clientes-inactivos.component';

describe('PanelAdministracionClientesInactivosComponent', () => {
  let component: PanelAdministracionClientesInactivosComponent;
  let fixture: ComponentFixture<PanelAdministracionClientesInactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdministracionClientesInactivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdministracionClientesInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
