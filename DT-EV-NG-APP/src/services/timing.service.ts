import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {BehaviorSubject, Observable} from 'rxjs';
import { ITiming } from '../app/interfaces/itiming';

@Injectable({
  providedIn: 'root'
})
export class TimingService {
  slotOneStartTimestamp: any = null;
  slotTwoStartTimestamp: any = null;
  slotThreeStartTimestamp: any = null;
  slotFourStartTimestamp: any = null;
  timestampData$ = new BehaviorSubject<ITiming>(null);

  constructor() {
    this.setTimestampData();
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
    this.setTimestampData();
    // this.setTimeLeft(slot);
  }

  setTimestampData() {
    // tslint:disable-next-line:variable-name
    const _data = {
      slotOneStartTimestamp: this.slotOneStartTimestamp,
      slotTwoStartTimestamp: this.slotTwoStartTimestamp,
      slotThreeStartTimestamp: this.slotThreeStartTimestamp,
      slotFourStartTimestamp: this.slotFourStartTimestamp
    };
    this.timestampData$.next(_data);
  }

  getStartTimestamp(): Observable<ITiming> {
    this.setTimestampData();
    return this.timestampData$.asObservable();
  }
}
