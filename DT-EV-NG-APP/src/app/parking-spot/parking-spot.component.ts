import {Component, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import * as moment from 'moment';
import {ParkingService} from '../../services/parking.service';
import {Subscription} from 'rxjs';
import {IParkingData} from '../interfaces/iparking-data';

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
  @Input() isOccupied: boolean;
  @Output() parkingSpotClickOutput = new EventEmitter<object>();

  parkingServiceData$: Subscription;
  parkingServiceData: IParkingData;
  parkedTimestamp: any;

  constructor(private parkingService: ParkingService) {
    this.setOccupiedStatus();
  }

  ngOnChanges() {
    if (this.isOccupied && !this.parkedTimestamp) {
      this.setParkedTimestamp();
    }
  }

  clickEmitter() {
    if (this.pendingChargerSlot === null) {// if a charger hasn't been selected yet, toggle isOccupied status
      // this.isOccupied = !this.isOccupied;
      this.parkingService.setSpotIsOccupied(this.spotNumber, !this.isOccupied)
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
      // tslint:disable-next-line:max-line-length
      this.parkingService.setSpotIsOccupied(this.pendingChargerSlot, false); // set the parking spot that just lost the charger connection to Unoccupied
      this.parkingService.setSpotIsOccupied(this.spotNumber, true);
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

  setOccupiedStatus() {
    this.parkingServiceData$ = this.parkingService.getParkingData()
      .subscribe(data => {
        this.parkingServiceData = data;
        // this.isOccupied
      });
  }
}
