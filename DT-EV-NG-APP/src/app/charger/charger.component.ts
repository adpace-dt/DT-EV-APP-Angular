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
  @Input() chargerOneSlot: number;
  @Input() chargerTwoSlot: number;
  @Input() timeLeft: any;
  @Output() chargerClickOutput = new EventEmitter<object>();
  showChargingArrows: boolean = null;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const chargerActive = () => {
      if (this.chargerNumber === 1) {
        // check if charger is set to initialization of default (0) /not charging
        return this.chargerOneSlot !== 0;
      } else {
        return this.chargerTwoSlot !== 0;
      }
    };
    this.showChargingArrows = this.pendingChargerSlot !== this.slotNumber
      && chargerActive();
  }

  clickEmitter() {
    const payload = {
      slotNumber: this.slotNumber,
      chargerNumber: this.chargerNumber
    };

    this.chargerClickOutput.emit(payload);
  }
}
