import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministracionUsuariosActivosComponent } from './panel-administracion-usuarios-activos.component';

describe('PanelAdministracionUsuariosActivosComponent', () => {
  let component: PanelAdministracionUsuariosActivosComponent;
  let fixture: ComponentFixture<PanelAdministracionUsuariosActivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdministracionUsuariosActivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdministracionUsuariosActivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
