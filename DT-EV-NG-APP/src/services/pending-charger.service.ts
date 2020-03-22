import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {IPendingCharger} from '../app/interfaces/ipending-charger';

@Injectable({
  providedIn: 'root'
})
export class PendingChargerService {
  pendingChargerDataSubject = new BehaviorSubject<IPendingCharger>(null);
  pendingChargerSlot: number = null;
  pendingChargerNumber: number = null;

  constructor() {
    this.setPendingChargerData();
  }

  setPendingCharger(chargerNumber: number, spot: number) {
    this.pendingChargerSlot = spot;
    this.pendingChargerNumber = chargerNumber;
    this.setPendingChargerData();
  }

  resetPendingCharger() {
    this.pendingChargerSlot = null;
    this.pendingChargerNumber = null;
    this.setPendingChargerData();
  }

  getPendingChargerData(): Observable<IPendingCharger> {
    // this.setPendingChargerData();
    return this.pendingChargerDataSubject.asObservable();
  }

  setPendingChargerData() {
    // tslint:disable-next-line:variable-name
    const _data = {
      pendingChargerSlot: this.pendingChargerSlot,
      pendingChargerNumber: this.pendingChargerNumber
    };
    this.pendingChargerDataSubject.next(_data);
  }

}
