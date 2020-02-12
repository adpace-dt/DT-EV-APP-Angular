import {Component, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.scss']
})
export class ParkingSpotComponent implements OnChanges {
  @Input() spotNumber: number;
  @Input() pendingChargerSlot: number;
  @Input() timeLeft: string;
  @Input() chargerOneSlot: number;
  @Input() chargerTwoSlot: number;
  @Output() parkingSpotClickOutput = new EventEmitter<object>();

  occupied = false;
  parkedTimestamp: any;

  constructor() {
  }

  ngOnChanges() {
    if (this.occupied && !this.parkedTimestamp) {
      this.setParkedTimestamp();
    }
  }

  clickEmitter() {
    // if
    if (this.pendingChargerSlot === null) {// if a charger hasn't been selected yet, toggle occupied status
      this.occupied = !this.occupied;
      this.setParkedTimestamp();
      if (this.chargerOneSlot === this.spotNumber) {// if we need to disconnect a current charger
        const payload = {
          spot: this.spotNumber,
          disconnect: true,
          chargerNumber: 1
        };
        this.parkingSpotClickOutput.emit(payload);
      } else if (this.chargerTwoSlot === this.spotNumber) {
        const payload = {
          spot: this.spotNumber,
          disconnect: true,
          chargerNumber: 2
        };
        this.parkingSpotClickOutput.emit(payload);
      }
    } else if (this.pendingChargerSlot) {
      this.occupied = true;
      const payload = {
        spot: this.spotNumber,
        disconnect: false
      };
      this.parkingSpotClickOutput.emit(payload);
    }
  }

  setParkedTimestamp() {
    this.parkedTimestamp = moment().format('h:mm a');
  }
}
