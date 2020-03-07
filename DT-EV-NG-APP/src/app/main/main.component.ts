import {Component, OnDestroy, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {timer} from 'rxjs';

import {ChargerService} from '../../services/charger.service';
import {ParkingService} from '../../services/parking.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  chargerData$: Subscription;
  parkingData$: Subscription;
  chargerData: object;
  temp = this.chargerService.slotThreeChargerNumber;

  chargerOneSlot = this.chargerService.chargerOneSlot;
  chargerTwoSlot = this.chargerService.chargerTwoSlot;
  pendingChargerSlot = this.chargerService.pendingChargerSlot;
  pendingChargerNumber = this.chargerService.pendingChargerNumber;
  slotOneChargerNumber = this.chargerService.slotOneChargerNumber;
  slotTwoChargerNumber  = this.chargerService.slotTwoChargerNumber;
  slotThreeChargerNumber  = this.chargerService.slotThreeChargerNumber;
  slotFourChargerNumber  = this.chargerService.slotThreeChargerNumber;
  slotOneTimeLeft = this.parkingService.slotOneTimeLeft;
  slotTwoTimeLeft = this.parkingService.slotTwoTimeLeft;
  slotThreeTimeLeft = this.parkingService.slotThreeTimeLeft;
  slotFourTimeLeft = this.parkingService.slotFourTimeLeft;
  slotOneStartTimestamp = this.parkingService.slotOneStartTimestamp;
  slotTwoStartTimestamp = this.parkingService.slotTwoStartTimestamp;
  slotThreeStartTimestamp = this.parkingService.slotThreeStartTimestamp;
  slotFourStartTimestamp = this.parkingService.slotFourStartTimestamp;
  slotOneTimer$: Subscription = null;
  slotTwoTimer$: Subscription = null;
  slotThreeTimer$: Subscription = null;
  slotFourTimer$: Subscription = null;

  // below will be used when refactoring for API's
  // parkingSlotOneOccupied = false;
  // parkingSlotTwoOccupied = false;
  // parkingSlotThreeOccupied = false;
  // parkingSlotFourOccupied = false;
  // private pendingChargerSlot$: BehaviorSubject<number>;

  constructor(private chargerService: ChargerService, private parkingService: ParkingService) {
    this.chargerData$ = this.chargerService.getChargerData()
      .subscribe(data => {
        this.chargerData = data;
      });
    this.parkingData$ = this.parkingService.getParkingData()
      .subscribe(data => {
        this.chargerData = data;
      });
  }

  ngOnDestroy() {
    this.chargerData$.unsubscribe();
  }

  chargerClickHandler($event) {
    this.chargerService.chargerClickHandler($event);
  }

  parkingSpotClickHandler(payload) {
    // this.parkingService.parkingSpotClickHandler(payload);
  }

  consoleLogData() {
    console.log('chargerOneSlot: ', this.chargerOneSlot);
    console.log('chargerTwoSlot: ', this.chargerTwoSlot);
    console.log('pendingChargerSlot: : ', this.pendingChargerSlot);
    console.log('pendingChargerNumber: ', this.pendingChargerNumber);
    console.log('slotOneChargerNumber: ', this.slotOneChargerNumber);
    console.log('slotTwoChargerNumber: ', this.slotTwoChargerNumber);
    console.log('slotThreeChargerNumber: ', this.slotThreeChargerNumber);
    console.log('slotFourChargerNumber: ', this.slotFourChargerNumber);
  }

  printChargerData() {
    console.log('from printChargerData', this.chargerData);
  }

  printChargerServiceData() {
    this.chargerService.consoleLogData();
  }

  printParkingServiceData() {
    this.parkingService.consoleLogData();
  }
}
