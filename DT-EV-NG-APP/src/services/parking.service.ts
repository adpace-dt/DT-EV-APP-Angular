import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {ChargerService} from './charger.service';
import {IChargerData} from '../app/interfaces/icharger-data';
import {IParkingData} from '../app/interfaces/iparking-data';
import {TimingService} from './timing.service';
import {PendingChargerService} from './pending-charger.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingService implements OnDestroy {
  chargerData$: Subscription;
  chargerData: IChargerData;
  parkingData$ = new BehaviorSubject<IParkingData>(null);

  slotOneTimeLeft: string;
  slotTwoTimeLeft: string;
  slotThreeTimeLeft: string;
  slotFourTimeLeft: string;
  slotOneStartTimestamp: any = null;
  slotTwoStartTimestamp: any = null;
  slotThreeStartTimestamp: any = null;
  slotFourStartTimestamp: any = null;
  slotOneTimer$: Subscription = null;
  slotTwoTimer$: Subscription = null;
  slotThreeTimer$: Subscription = null;
  slotFourTimer$: Subscription = null;

  constructor(private chargerService: ChargerService,
              private timingService: TimingService,
              private pendingChargerService: PendingChargerService) {
    this.chargerData$ = this.chargerService.getChargerData()
      .subscribe(
        data => this.chargerData = data
      );
    this.timingService.getTimingData()
      .subscribe(
        data => {
          this.slotOneTimeLeft = data.slotOneTimeLeft;
          this.slotTwoTimeLeft = data.slotTwoTimeLeft;
          this.slotThreeTimeLeft = data.slotThreeTimeLeft;
          this.slotFourTimeLeft = data.slotFourTimeLeft;
          this.slotOneStartTimestamp = data.slotOneStartTimestamp;
          this.slotTwoStartTimestamp = data.slotTwoStartTimestamp;
          this.slotThreeStartTimestamp = data.slotThreeStartTimestamp;
          this.slotFourStartTimestamp = data.slotFourStartTimestamp;
          this.setParkingData();
        }
      );
    this.setParkingData();
  }

  ngOnDestroy() {
    this.chargerData$.unsubscribe();
  }

  setParkingData() {
    // tslint:disable-next-line:variable-name
    const _data = {
      slotOneTimeLeft: this.slotOneTimeLeft,
      slotTwoTimeLeft: this.slotTwoTimeLeft,
      slotThreeTimeLeft: this.slotThreeTimeLeft,
      slotFourTimeLeft: this.slotFourTimeLeft,
      slotOneStartTimestamp: this.slotOneStartTimestamp,
      slotTwoStartTimestamp: this.slotTwoStartTimestamp,
      slotThreeStartTimestamp: this.slotThreeStartTimestamp,
      slotFourStartTimestamp: this.slotFourStartTimestamp,
      slotOneTimer$: this.slotOneTimer$,
      slotTwoTimer$: this.slotTwoTimer$,
      slotThreeTimer$: this.slotThreeTimer$,
      slotFourTimer$: this.slotFourTimer$
    };
    this.parkingData$.next(_data);
  }

  getParkingData(): Observable<IParkingData> {
    return this.parkingData$.asObservable();
  }

  parkingSpotClickHandler(payload) {
    if (payload.disconnect) {
      this.timingService.setTimerToNull(payload.spot);
      this.pendingChargerService.setPendingCharger(payload.chargerNumber, payload.spot);
      this.chargerService.setCharger(payload.chargerNumber, 0);
      payload.chargerNumber === 1 ? this.chargerService.setChargerOneSlot(0) : this.chargerService.setChargerTwoSlot(0);
    } else {
      this.timingService.resetChargerStartTimestamp();
      this.chargerService.setCharger(this.chargerData.pendingChargerNumber, payload.spot);
    }
    this.setParkingData();
  }

  consoleLogData() {
    console.log('parkingData$: ', this.parkingData$.getValue());
    // console.log('chargerData', this.chargerData);
    // console.log('from parking service', this.slotOneTimeLeft);
    // console.log('from parking service', this.slotTwoTimeLeft);
    // console.log('from parking service', this.slotThreeTimeLeft);
    // console.log('from parking service', this.slotFourTimeLeft);
    // console.log('from parking service', this.slotOneStartTimestamp);
    // console.log('from parking service', this.slotTwoStartTimestamp);
    // console.log('from parking service', this.slotThreeStartTimestamp);
    // console.log('from parking service', this.slotFourStartTimestamp);
    // console.log('from parking service', this.slotOneTimer$);
    // console.log('from parking service', this.slotTwoTimer$);
    // console.log('from parking service', this.slotThreeTimer$);
    // console.log('from parking service', this.slotFourTimer$);
  }
}
