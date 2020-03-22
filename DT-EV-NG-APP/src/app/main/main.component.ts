import {Component, OnDestroy, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {ChargerService} from '../../services/charger.service';
import {ParkingService} from '../../services/parking.service';
import {TimingService} from '../../services/timing.service';
import {IChargerData} from '../interfaces/icharger-data';
import {IParkingData} from '../interfaces/iparking-data';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnDestroy {
  chargerData$: Subscription;
  parkingData$: Subscription;
  timingData$: Subscription;
  chargerData: IChargerData;
  parkingData: IParkingData;

  constructor(private chargerService: ChargerService,
              private parkingService: ParkingService,
              private timingService: TimingService) {
    this.chargerData$ = this.chargerService.getChargerData()
      .subscribe(data => {
        this.chargerData = data;
      });
    this.parkingData$ = this.parkingService.getParkingData()
      .subscribe(data => {
        this.parkingData = data;
      });
    this.timingData$ = this.timingService.getTimingData()
      .subscribe(data => {
        this.parkingData = data;
      });
  }

  ngOnDestroy() {
    this.chargerData$.unsubscribe();
  }

  chargerClickHandler($event) {
    this.chargerService.chargerClickHandler($event);
  }

  parkingSpotClickHandler(payload) {
    this.parkingService.parkingSpotClickHandler(payload);
  }
}
