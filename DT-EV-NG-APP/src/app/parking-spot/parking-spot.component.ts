import {Component, OnInit, OnChanges, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.scss']
})
export class ParkingSpotComponent implements OnInit, OnChanges {
  @Input() spotNumber: number;
  @Input() pendingChargerSlot;
  @Input() timeLeft: string;
  @Output() parkingSpotClickOutput = new EventEmitter<number>();

  occupied = false;
  topMessage;

  constructor() {
  }

  ngOnInit() {
      if (this.timeLeft) {
        this.topMessage = this.timeLeft.toString();
      } else if (!this.timeLeft && !this.occupied) {
        this.topMessage = 'Space Available';
      } else {
        this.topMessage = 'This spot is waiting to charge - timestamp';
      }
    }

    ngOnChanges() {
      if (this.timeLeft) {
        this.topMessage = this.timeLeft.toString();
      } else if (!this.timeLeft && !this.occupied) {
        this.topMessage = 'Space Available';
      } else {
        this.topMessage = 'This spot is waiting to charge - timestamp';
      }
    }

    setTopMessage() {
    if (!this.occupied) {
      this.topMessage = 'Space Available';
    } else if (!this.timeLeft && !this.occupied) {
      this.topMessage = 'This spot is waiting to charge - timestamp';
      } else {
        this.topMessage = 'display time left';
      }
    }

  clickEmitter() {
    if (this.pendingChargerSlot === null) {// if a charger hasn't been selected yet, toggle occupied status
      this.occupied = !this.occupied;
      this.setTopMessage();
    } else if (this.pendingChargerSlot) {
      this.occupied = true;
      this.parkingSpotClickOutput.emit(this.spotNumber);
      this.setTopMessage();
    }

    /*let payload = {
      spotNumber: this.spotNumber,
      occupied: this.occupied
    };*/

  }


}
