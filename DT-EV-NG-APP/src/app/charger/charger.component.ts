import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss']
})
export class ChargerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
@Input() chargerNumber: number;
}
