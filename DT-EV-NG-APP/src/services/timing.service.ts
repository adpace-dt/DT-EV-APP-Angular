/*import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {ITiming} from '../app/interfaces/itiming';
import {IChargerData} from '../app/interfaces/icharger-data';
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

  constructor(private pendingChargerService: PendingChargerService) {
    this.getPendingChargerData();
    this.setTimingData();
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
    this.setTimingData();
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

  resetChargerStartTimestamp() {
    console.log('resetChargerStartTimestamp() called');
    this.getPendingChargerData();
    console.log(this.pendingChargerData.pendingChargerNumber);
    if (this.pendingChargerData.pendingChargerNumber === 1) {
      switch (this.pendingChargerData.chargerOneSlot) {
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
      switch (this.pendingChargerData.chargerTwoSlot) {
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

// refactor of getChargerData is breaking charger click on another spot when one is charging resetting timestamp correctly
  getPendingChargerData() {
    console.log('this.getPendingChargerData() hit from timing service to pending charger service');
    this.pendingChargerData$ = this.pendingChargerService.getPendingChargerData()
      .subscribe(data => {
        console.log(data);
        this.pendingChargerData = data;
      });
  }
}*/



import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {ITiming} from '../app/interfaces/itiming';
import {ChargerService} from './charger.service';
import {IChargerData} from '../app/interfaces/icharger-data';
import { Injector } from '@angular/core';
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
  timestampData$ = new BehaviorSubject<ITiming>(null);
  timingData$ = new BehaviorSubject<ITiming>(null);
  pendingChargerData$: Subscription = null;
  chargerData: IChargerData;
  private chargerService: ChargerService;
  pendingChargerSlot: number = null;
  pendingChargerNumber: number = null;



  constructor(private injector: Injector, private pendingChargerService: PendingChargerService) {
    this.setPendingChargerData();
    this.setTimingData();
  }
  setPendingChargerData() {
    this.pendingChargerData$ = this.pendingChargerService.getPendingChargerData()
      .subscribe(
        data => {
          this.pendingChargerNumber = data.pendingChargerNumber;
          this.pendingChargerSlot = data.pendingChargerSlot;
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

  resetChargerStartTimestamp() {
    // this.getPendingChargerData(); // commented out to move to constructor

    if (this.pendingChargerNumber === 1) {
      switch (this.chargerData.chargerOneSlot) {
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
      switch (this.chargerData.chargerTwoSlot) {
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

  getPendingChargerData() {
    this.pendingChargerData$ =  this.pendingChargerService.getPendingChargerData()
      .subscribe(
        data => {
          this.pendingChargerNumber = data.pendingChargerNumber;
          this.pendingChargerSlot = data.pendingChargerSlot;
        }
      );



    this.chargerService = this.injector.get(ChargerService);
    console.log('from get pending charger data:');
    // this.pendingChargerData$ = this.pendingChargerService.getPendingChargerData()
    this.pendingChargerData$ = this.chargerService.getChargerData()
      .subscribe(data => {
        console.log('charger Data: ', data);
        this.chargerData = data;
      });
  }
  // getChargerData() {
  //   this.chargerService = this.injector.get(ChargerService);
  //   this.chargerData$ = this.chargerService.getChargerData()
  //     .subscribe(data => {
  //       this.chargerData = data;
  //     });
  // }
}
/*

import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import {ITiming} from '../app/interfaces/itiming';
import {ChargerService} from './charger.service';
import {IChargerData} from '../app/interfaces/icharger-data';
import { Injector } from '@angular/core';

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
  timestampData$ = new BehaviorSubject<ITiming>(null);
  timingData$ = new BehaviorSubject<ITiming>(null);
  chargerData$: Subscription = null;
  chargerData: IChargerData;
  private chargerService: ChargerService;

  constructor(private injector: Injector) {
    this.setTimingData();
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

  resetChargerStartTimestamp() {
    this.getChargerData();

    if (this.chargerData.pendingChargerNumber === 1) {
      switch (this.chargerData.chargerOneSlot) {
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
      switch (this.chargerData.chargerTwoSlot) {
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

  getChargerData() {
    this.chargerService = this.injector.get(ChargerService);
    this.chargerData$ = this.chargerService.getChargerData()
      .subscribe(data => {
        this.chargerData = data;
      });
  }
}
*/

