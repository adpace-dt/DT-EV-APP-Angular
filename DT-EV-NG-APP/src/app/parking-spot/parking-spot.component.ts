import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.scss']
})
export class ParkingSpotComponent implements OnInit {
  @Input() spotNumber: number;
  @Input() pendingChargerSlot;
  @Output() parkingSpotClickOutput = new EventEmitter<number>();

  occupied = false;

  constructor() {
  }

  ngOnInit() {
  }

  clickEmitter() {
    if (this.pendingChargerSlot === null) {
      this.occupied = !this.occupied;
    } else if (this.pendingChargerSlot) {
      this.occupied = true;
      this.parkingSpotClickOutput.emit(this.spotNumber);
    }

    /*let payload = {
      spotNumber: this.spotNumber,
      occupied: this.occupied
    };*/

  }


}
