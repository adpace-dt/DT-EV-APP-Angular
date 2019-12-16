import {Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-charger',
  templateUrl: './charger.component.html',
  styleUrls: ['./charger.component.scss']
})
export class ChargerComponent implements OnInit, OnChanges {
  @Input() chargerNumber: number;
  @Input() slotNumber: number;
  @Input() pendingChargerSlot: number;
  @Input() chargerSlotOne: number;
  @Input() chargerSlotTwo: number;
  @Output() chargerClickOutput = new EventEmitter<object>();
  showChargingArrows: boolean = null;

  constructor() {
  }

  ngOnInit() {
    if(this.pendingChargerSlot !== this.slotNumber) {
      this.showChargingArrows = true;
    } else {
      this.showChargingArrows = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if (this.pendingChargerSlot === this.slotNumber) {
      console.log(this.pendingChargerSlot);
    }*/
  }

  clickEmitter() {
    let payload = {
      slotNumber: this.slotNumber,
      chargerNumber: this.chargerNumber
    };

    this.chargerClickOutput.emit(payload);
  }
}
