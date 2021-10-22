import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {
  @Input() color: string;
  @Input() mensaje: string;
  constructor() { }

  ngOnInit(): void {
  }

}
