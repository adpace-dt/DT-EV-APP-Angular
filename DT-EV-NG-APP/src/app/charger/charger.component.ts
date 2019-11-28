import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss']
})
export class ChargerComponent implements OnInit {
  @Input() chargerNumber: number;
  @Input() slotNumber: number;
  @Input() pendingChargerSlot: number;
  @Output() chargerClickOutput = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  clickEmitter() {
    this.chargerClickOutput.emit(this.slotNumber);
  }
}
