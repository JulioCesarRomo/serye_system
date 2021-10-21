import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdministracionUsuariosInactivosComponent } from './panel-administracion-usuarios-inactivos.component';

describe('PanelAdministracionUsuariosInactivosComponent', () => {
  let component: PanelAdministracionUsuariosInactivosComponent;
  let fixture: ComponentFixture<PanelAdministracionUsuariosInactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdministracionUsuariosInactivosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdministracionUsuariosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
