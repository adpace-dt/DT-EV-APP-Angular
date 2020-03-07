import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import * as moment from 'moment';
import {ChargerService} from './charger.service';
import { IChargerData } from '../app/interfaces/icharger-data'

@Injectable({
  providedIn: 'root'
})
export class ParkingService implements OnDestroy {
  chargerService: ChargerService;
  chargerData$: Subscription;
  chargerData: IChargerData;
  parkingData$ = new BehaviorSubject<any>(null);

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

  constructor() {
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

  getParkingData(): Observable<object> {
    return this.parkingData$.asObservable();
  }

  setStartTime(slot) {
    switch (slot) {
      case 1:
        this.slotOneStartTimestamp = moment();
        break;
      case 2:
        this.slotTwoStartTimestamp = moment();
        break;
      case 3:
        this.slotThreeStartTimestamp = moment();
        break;
      case 4:
        this.slotFourStartTimestamp = moment();
        break;
    }
    this.setTimeLeft(slot);
  }

  setTimeLeft(slot) {
    const timer$ = timer(0, 1000);
    switch (slot) {
      case 1:
        this.slotOneTimer$ = timer$
          .subscribe(() => {
            const time = moment();
            const end = moment(this.slotOneStartTimestamp).add(3, 'hours');
            const duration = moment.duration(time.diff(end));
            this.slotOneTimeLeft =
              (Math.abs(duration.hours()) > 0 ? Math.abs(duration.hours()) + ':' : '')
              + (Math.abs(duration.minutes()) > 0 ? Math.abs(duration.minutes()) + ':' : '')
              + (Math.abs(duration.seconds()) < 10 ? '0' + Math.abs(duration.seconds()) : Math.abs(duration.seconds()));
          });
        break;

      case 2:
        this.slotTwoTimer$ = timer$
          .subscribe(() => {
            const time = moment();
            const end = moment(this.slotTwoStartTimestamp).add(3, 'hours');
            const duration = moment.duration(time.diff(end));
            this.slotTwoTimeLeft =
              (Math.abs(duration.hours()) > 0 ? Math.abs(duration.hours()) + ':' : '')
              + (Math.abs(duration.minutes()) > 0 ? Math.abs(duration.minutes()) + ':' : '')
              + (Math.abs(duration.seconds()) < 10 ? '0' + Math.abs(duration.seconds()) : Math.abs(duration.seconds()));
          });
        break;

      case 3:
        this.slotThreeTimer$ = timer$
          .subscribe(() => {
            const time = moment();
            const end = moment(this.slotThreeStartTimestamp).add(3, 'hours');
            const duration = moment.duration(time.diff(end));
            this.slotThreeTimeLeft = (Math.abs(duration.hours()) > 0 ? Math.abs(duration.hours()) + ':' : '')
              + (Math.abs(duration.minutes()) > 0 ? Math.abs(duration.minutes()) + ':' : '')
              + (Math.abs(duration.seconds()) < 10 ? '0' + Math.abs(duration.seconds()) : Math.abs(duration.seconds()));
          });
        break;

      case 4:
        this.slotFourTimer$ = timer$
          .subscribe(() => {
            const time = moment();
            const end = moment(this.slotFourStartTimestamp).add(3, 'hours');
            const duration = moment.duration(time.diff(end));
            this.slotFourTimeLeft = (Math.abs(duration.hours()) > 0 ? Math.abs(duration.hours()) + ':' : '')
              + (Math.abs(duration.minutes()) > 0 ? Math.abs(duration.minutes()) + ':' : '')
              + (Math.abs(duration.seconds()) < 10 ? '0' + Math.abs(duration.seconds()) : Math.abs(duration.seconds()));
          });
        break;
    }

  }

  setTimerToNull(spot) {
    switch (spot) {
      case 1 :
        this.slotOneStartTimestamp = null;
        this.slotOneTimeLeft = null;
        if (this.slotOneTimer$ !== null) {
          this.slotOneTimer$.unsubscribe();
        }
        break;
      case 2 :
        this.slotTwoStartTimestamp = null;
        this.slotTwoTimeLeft = null;
        if (this.slotTwoTimer$ !== null) {
          this.slotTwoTimer$.unsubscribe();
        }
        break;
      case 3 :
        this.slotThreeStartTimestamp = null;
        this.slotThreeTimeLeft = null;
        if (this.slotThreeTimer$ !== null) {
          this.slotThreeTimer$.unsubscribe();
        }
        break;
      case 4 :
        this.slotFourStartTimestamp = null;
        this.slotFourTimeLeft = null;
        if (this.slotFourTimer$ !== null) {
          this.slotFourTimer$.unsubscribe();
        }
        break;
    }
  }

  resetChargerStartTimestamp() {
    if (this.chargerData.pendingChargerNumber === 1) {
      switch (this.chargerOneSlot) {
        case 1:
          this.setTimerToNull(1);
          break;
        case 2:
          this.setTimerToNull(2);
          break;
        case 3:
          this.setTimerToNull(3);
          break;
        case 4:
          this.setTimerToNull(4);
          break;
      }
    } else {
      switch (this.chargerTwoSlot) {
        case 1:
          this.setTimerToNull(1);
          break;
        case 2:
          this.setTimerToNull(2);
          break;
        case 3:
          this.setTimerToNull(3);
          break;
        case 4:
          this.setTimerToNull(4);
          break;
      }
    }
  }

  parkingSpotClickHandler(payload) {
    console.log('parkingSpotClickHandler(payload):', payload);
    if (payload.disconnect) {
      console.log('set timer to null in spot: ', payload.spot);
      this.setTimerToNull(payload.spot);
      this.chargerService.setPendingCharger(payload.chargerNumber, payload.spot)
      // this.pendingChargerSlot = payload.spot;
      // this.pendingChargerNumber = payload.chargerNumber;
      this.chargerService.setCharger(payload.chargerNumber, 0);
      payload.chargerNumber === 1 ? this.chargerService.setChargerOneSlot(0) : this.chargerService.setChargerTwoSlot(0);
      // this.consoleLogData();
    } else {
      this.resetChargerStartTimestamp();
    }
  }

  consoleLogData() {
    console.log('chargerData', this.chargerData);
    console.log('from parking service', this.slotOneTimeLeft);
    console.log('from parking service', this.slotTwoTimeLeft);
    console.log('from parking service', this.slotThreeTimeLeft);
    console.log('from parking service', this.slotFourTimeLeft);
    console.log('from parking service', this.slotOneStartTimestamp);
    console.log('from parking service', this.slotTwoStartTimestamp);
    console.log('from parking service', this.slotThreeStartTimestamp);
    console.log('from parking service', this.slotFourStartTimestamp);
    console.log('from parking service', this.slotOneTimer$);
    console.log('from parking service', this.slotTwoTimer$);
    console.log('from parking service', this.slotThreeTimer$);
    console.log('from parking service', this.slotFourTimer$);
  }
}
