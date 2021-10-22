import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs/internal/Subscription';
import {EventosService} from "../../../nucleo/eventos.service";
import {PaginadorGrande} from "../../constantes/opciones-tamanio-paginador.constant";
import {Paginador} from "../../modelos/paginador.model";

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
})
export class PaginadorComponent implements OnInit, OnDestroy {
  @ViewChild('paginador', { static: true }) paginador: MatPaginator;
  @Input() filtro?: string;
  @Input() total: number;
  @Input() nombreElementos: string;
  @Output() cambioDePaginaEvento: EventEmitter<Paginador> = new EventEmitter(true);
  subscripcionPaginador: Subscription;
  inicio: number = 0;
  fin: number = PaginadorGrande[0];
  tamPagina: number = PaginadorGrande[0];
  OpcionesTamanioPaginador = PaginadorGrande;
  cambioIdioma: MatPaginatorIntl = new MatPaginatorIntl();
  constructor(private _serEventos: EventosService, private detectorCambios: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscripcionPaginador = this._serEventos.reiniciarIndicePaginadorEventoObservable$.subscribe(
      (reiniciar: boolean) => {
        if (reiniciar) {
          this.paginador.pageIndex = 0;
          this.inicio = 0;
          this.fin = this.tamPagina;
        }
      }
    );
    if (this.nombreElementos) this.cambioIdioma.itemsPerPageLabel = `${this.nombreElementos} por pagina:`;
    else this.cambioIdioma.itemsPerPageLabel = '';
    this.cambioIdioma.nextPageLabel = 'Siguiente';
    this.cambioIdioma.previousPageLabel = 'Anterior';
    this.cambioIdioma.getRangeLabel = (page: number, pageSize: number, length: number) => { if (length == 0 || pageSize == 0) { return `0 de ${length}`; } length = Math.max(length, 0); const startIndex = page * pageSize; const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize; return `${startIndex + 1} – ${endIndex} de ${length}`; }
    this.cambioIdioma.firstPageLabel = 'Inicio';
    this.cambioIdioma.lastPageLabel = 'Fin';
    this.paginador._intl = this.cambioIdioma;
  }

  cambioDePagina(evento: PageEvent) {
    this.tamPagina = evento.pageSize;
    this.inicio = (this.tamPagina * evento.pageIndex);
    this.fin = ((evento.pageIndex + 1) * (this.tamPagina));
    this.cambioDePaginaEvento.emit({ inicio: this.inicio, fin: this.tamPagina });
  }

  ngOnDestroy(): void {
    this.subscripcionPaginador.unsubscribe();
  }
}
