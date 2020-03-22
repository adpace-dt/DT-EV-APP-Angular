import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {ITiming} from '../app/interfaces/itiming';
import {ChargerService} from './charger.service';
import {IChargerData} from '../app/interfaces/icharger-data';
import {Injector} from '@angular/core';
import {PendingChargerService} from './pending-charger.service';

@Injectable({
  providedIn: 'root'
})
export class TimingService {
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
  timingData$ = new BehaviorSubject<ITiming>(null);
  pendingChargerData$: Subscription = null;
  pendingChargerData: IChargerData;


  constructor(private injector: Injector, private pendingChargerService: PendingChargerService) {
    this.setPendingChargerData();
    this.setTimingData();
  }

  setPendingChargerData() {
    this.pendingChargerData$ = this.pendingChargerService.getPendingChargerData()
      .subscribe(
        data => {
          this.pendingChargerData = data;
        }
      );
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
    this.setTimingData();
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
            this.setTimingData();
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
            this.setTimingData();
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
            this.setTimingData();
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
            this.setTimingData();
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
    this.setTimingData();
  }

  resetChargerStartTimestamp(chargerData) {
    if (this.pendingChargerData.pendingChargerNumber === 1) {
      switch (chargerData/**/.chargerOneSlot) { // doesn't exist on pendingChargerData
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
      switch (chargerData/**/.chargerTwoSlot) {
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
    this.setTimingData();
  }

  private setTimingData() {
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
    this.timingData$.next(_data);
  }

  getTimingData(): Observable<ITiming> {
    this.setTimingData();
    return this.timingData$.asObservable();
  }
}

