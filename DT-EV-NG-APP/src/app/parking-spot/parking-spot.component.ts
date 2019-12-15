import {Component, Input, EventEmitter, Output} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.scss']
})
export class ParkingSpotComponent {
  @Input() spotNumber: number;
  @Input() pendingChargerSlot;
  @Input() timeLeft: string;
  @Output() parkingSpotClickOutput = new EventEmitter<number>();

  occupied = false;
  parkedTimestamp: any;

  constructor() {
  }

  clickEmitter() {
    if (this.pendingChargerSlot === null) {// if a charger hasn't been selected yet, toggle occupied status
      this.occupied = !this.occupied;
      this.setParkedTimestamp();
    } else if (this.pendingChargerSlot) {
      this.occupied = true;
      this.parkingSpotClickOutput.emit(this.spotNumber);
    }
  }

  setParkedTimestamp() {
    this.parkedTimestamp = moment().format('h:mm a')
  }
}
