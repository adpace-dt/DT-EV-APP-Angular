import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import * as moment from 'moment';
import {IChargerData} from '../app/interfaces/icharger-data';
import {TimingService} from './timing.service';
import {PendingChargerService} from './pending-charger.service';
import {IPendingCharger} from '../app/interfaces/ipending-charger';

@Injectable({
  providedIn: 'root'
})
export class ChargerService implements OnDestroy {
  chargerDataSubject = new BehaviorSubject<IChargerData>(null);
  chargerOneSlot = 0;
  chargerTwoSlot = 0;
  pendingChargerSlot: number = null;
  pendingChargerNumber: number = null;
  slotOneChargerNumber: number = null;
  slotTwoChargerNumber = 1;
  slotThreeChargerNumber = 2;
  slotFourChargerNumber: number = null;

  timingData$: Subscription;
  pendingChargerData$: Subscription;
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

  constructor(private timingService: TimingService, private pendingChargerService: PendingChargerService) {
    this.setChargerData();
    this.timingData$ = timingService.getTimingData()
      .subscribe(
        data => {
          this.slotOneStartTimestamp = data.slotOneStartTimestamp;
          this.slotTwoStartTimestamp = data.slotTwoStartTimestamp;
          this.slotThreeStartTimestamp = data.slotThreeStartTimestamp;
          this.slotFourStartTimestamp = data.slotFourStartTimestamp;
          this.setChargerData();
        }
      );
    this.pendingChargerData$ =  pendingChargerService.getPendingChargerData()
      .subscribe(
        data => {
          this.pendingChargerNumber = data.pendingChargerNumber;
          this.pendingChargerSlot = data.pendingChargerSlot;
        }
      );
  }

  ngOnDestroy(): void {
    this.timingData$.unsubscribe();
    this.pendingChargerData$.unsubscribe();
  }

  getChargerData(): Observable<IChargerData> {
    return this.chargerDataSubject.asObservable();
  }

  setChargerData() {
    // tslint:disable-next-line:variable-name
    const _data = {
      chargerOneSlot: this.chargerOneSlot,
      chargerTwoSlot: this.chargerTwoSlot,
      pendingChargerSlot: this.pendingChargerSlot,
      pendingChargerNumber: this.pendingChargerNumber,
      slotOneChargerNumber: this.slotOneChargerNumber,
      slotTwoChargerNumber: this.slotTwoChargerNumber,
      slotThreeChargerNumber: this.slotThreeChargerNumber,
      slotFourChargerNumber: this.slotFourChargerNumber
    };
    this.chargerDataSubject.next(_data);
  }

  resetPendingCharger() {
    this.pendingChargerService.resetPendingCharger();
    this.setChargerData(); // may not still need this since pending charger is now an observable
  }

  setAllSlotsNull(chargerNumber: number) {
    // set all slotChargerNumbers to null before setting slot
    if (this.slotOneChargerNumber === chargerNumber) {
      this.slotOneChargerNumber = null;
    }
    if (this.slotTwoChargerNumber === chargerNumber) {
      this.slotTwoChargerNumber = null;
    }
    if (this.slotThreeChargerNumber === chargerNumber) {
      this.slotThreeChargerNumber = null;
    }
    if (this.slotFourChargerNumber === chargerNumber) {
      this.slotFourChargerNumber = null;
    }
    this.setChargerData();
  }

  setCharger(chargerNumber, slot) {
    if (chargerNumber && (slot || slot === 0)) {
      // slot === 0 is called for a charger disconnect event
      if (slot === 0) {
        this.setAllSlotsNull(chargerNumber);
        // set the charger to a default slot
        if (chargerNumber === 1) {
          this.chargerOneSlot = 0;
          this.slotTwoChargerNumber === 2 ? this.slotThreeChargerNumber = 1 : this.slotTwoChargerNumber = 1;
        } else { // Charger === 2
          this.chargerTwoSlot = 0;
          this.slotThreeChargerNumber === 1 ? this.slotTwoChargerNumber = 2 : this.slotThreeChargerNumber = 2;
        }
        this.resetPendingCharger();
      }

      if (slot === 1) {
        if (this.slotOneChargerNumber === null) {
          this.setAllSlotsNull(chargerNumber);
          this.slotOneChargerNumber = chargerNumber;
          this.timingService.setStartTime(slot);
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
          this.resetPendingCharger();
        } else {
          console.warn('slot not empty');
        }
      }

      if (slot === 2) {
        // Check if slot is occupied with a charger in default mode
        if (this.slotTwoChargerNumber !== null && (this.chargerOneSlot === 0 || this.chargerTwoSlot === 0)) {
          if (chargerNumber === 1) {
            // if charger 2 is in default state in slot 2, move it to slot 3
            if (this.chargerTwoSlot === 0 && this.slotTwoChargerNumber === 2) {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 2;
              this.slotTwoChargerNumber = 1;
              this.chargerOneSlot = 2;
              this.timingService.setStartTime(slot);
            } else if (this.chargerTwoSlot === 2) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 1;
              this.chargerOneSlot = 2;
              this.timingService.setStartTime(slot);
            }
          } else { // chargerNumber === 2
            if (this.chargerOneSlot === 0 && this.slotTwoChargerNumber === 1) {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 1;
              this.slotTwoChargerNumber = 2;
              this.chargerTwoSlot = 2;
              this.timingService.setStartTime(slot);
            } else if (this.chargerOneSlot === 2) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 2;
              this.chargerTwoSlot = 2;
              this.timingService.setStartTime(slot);
            }
          }
        }

        if (this.slotTwoChargerNumber === null) {
          this.setAllSlotsNull(chargerNumber);
          this.slotTwoChargerNumber = chargerNumber;
          this.timingService.setStartTime(slot);
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
        } else {
          console.warn('slot not empty');
        }
        this.resetPendingCharger();
      }

      if (slot === 3) {
        if (this.slotThreeChargerNumber !== null && (this.chargerOneSlot === 0 || this.chargerTwoSlot === 0)) {
          if (chargerNumber === 1) {
            // if charger 2 is in default state in slot 3, move it to slot 2
            if (this.chargerTwoSlot === 0 && this.slotThreeChargerNumber === 2) {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 2;
              this.slotThreeChargerNumber = 1;
              this.chargerOneSlot = 3;
              this.timingService.setStartTime(slot);
            } else if (this.chargerTwoSlot === 3) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 1;
              this.chargerOneSlot = 3;
              this.timingService.setStartTime(slot);
            }
          } else { // chargerNumber === 2
            if (this.chargerOneSlot === 0 && this.slotThreeChargerNumber === 1) {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 1;
              this.slotThreeChargerNumber = 2;
              this.chargerTwoSlot = 3;
              this.timingService.setStartTime(slot);
            } else if (this.chargerOneSlot === 3) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 2;
              this.chargerTwoSlot = 3;
              this.timingService.setStartTime(slot);
            }
          }
        } else if (this.slotThreeChargerNumber === null) {
          // check to see if there is a default charger set in this slot
          this.setAllSlotsNull(chargerNumber);
          this.slotThreeChargerNumber = chargerNumber;
          this.timingService.setStartTime(slot);
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
        }
        this.resetPendingCharger();
      }

      if (slot === 4) {
        if (this.slotFourChargerNumber === null) {
          this.setAllSlotsNull(chargerNumber);
          this.slotFourChargerNumber = chargerNumber;
          this.timingService.setStartTime(slot);
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
          this.resetPendingCharger();
        } else {
          console.warn('slot not empty');
        }
      }
    }
    this.setChargerData();
  }

  consoleLogData() {
    console.log(this.chargerDataSubject.getValue());
  }

  chargerClickHandler($event) {
    if (this.pendingChargerSlot === null) {
      this.pendingChargerService.setPendingCharger($event.chargerNumber, $event.slotNumber);
    } else if (this.pendingChargerSlot === $event.slotNumber) { // if the user clicks the charger a second time
      this.resetPendingCharger();
    } else if (this.pendingChargerSlot !== null && this.pendingChargerSlot !== $event.slotNumber) {
      this.pendingChargerService.setPendingCharger($event.chargerNumber, $event.slotNumber);
    }
    this.setChargerData();
  }

  setChargerOneSlot(slot: number) {
    this.chargerOneSlot = slot;
    this.setChargerData();
  }

  setChargerTwoSlot(slot: number) {
    this.chargerTwoSlot = slot;
    this.setChargerData();
  }

}
