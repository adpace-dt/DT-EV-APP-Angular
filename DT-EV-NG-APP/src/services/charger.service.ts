import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription, timer} from 'rxjs';
import * as moment from 'moment';
import {IChargerData} from '../app/interfaces/icharger-data';
import {TimingService} from './timing.service';

@Injectable({
  providedIn: 'root'
})
export class ChargerService {
  chargerDataSubject = new BehaviorSubject<IChargerData>(null);
  chargerOneSlot = 0;
  chargerTwoSlot = 0;
  pendingChargerSlot: number = null;
  pendingChargerNumber: number = null;
  slotOneChargerNumber: number = null;
  slotTwoChargerNumber = 1;
  slotThreeChargerNumber = 2;
  slotFourChargerNumber: number = null;

  // parkingData: IParkingData;
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

  constructor(private timingService: TimingService) {
    this.setChargerData();
    timingService.getTimingData()
      .subscribe(
        data => {
          console.log(data);
          this.slotOneStartTimestamp = data.slotOneStartTimestamp;
          this.slotTwoStartTimestamp = data.slotTwoStartTimestamp;
          this.slotThreeStartTimestamp = data.slotThreeStartTimestamp;
          this.slotFourStartTimestamp = data.slotFourStartTimestamp;
          this.setChargerData();
        }
      );
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
    this.pendingChargerSlot = null;
    this.pendingChargerNumber = null;
    this.setChargerData();
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
    console.log('setCharger hit in charger service: #/slot: ', chargerNumber, slot);
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
      this.pendingChargerSlot = $event.slotNumber;
      this.pendingChargerNumber = $event.chargerNumber;
    } else if (this.pendingChargerSlot === $event.slotNumber) { // if the user clicks the charger a second time
      this.resetPendingCharger();
    } else if (this.pendingChargerSlot !== null && this.pendingChargerSlot !== $event.slotNumber) {
      this.pendingChargerSlot = $event.slotNumber;
      this.pendingChargerNumber = $event.chargerNumber;
    }
    this.setChargerData();
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
    this.setChargerData();
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

    this.setChargerData();
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
    this.setChargerData();
  }

  resetChargerStartTimestamp() {
    if (this.pendingChargerNumber === 1) {
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
    this.setChargerData();
  }

  parkingSpotClickHandler(payload) {
    console.log('parkingSpotClickHandler(payload):', payload);
    if (payload.disconnect) {

      console.log('set timer to null in spot: ', payload.spot);
      this.setTimerToNull(payload.spot);
      this.pendingChargerSlot = payload.spot;
      this.pendingChargerNumber = payload.chargerNumber;
      this.setCharger(payload.chargerNumber, 0);
      payload.chargerNumber === 1 ? this.chargerOneSlot = 0 : this.chargerTwoSlot = 0;
      this.consoleLogData();
    } else {
      this.resetChargerStartTimestamp();
      this.setCharger(this.pendingChargerNumber, payload.spot);
    }
  }

  setChargerOneSlot(slot: number) {
    this.chargerOneSlot = slot;
    this.setChargerData();
  }

  setChargerTwoSlot(slot: number) {
    this.chargerTwoSlot = slot;
    this.setChargerData();
  }

  setPendingCharger(chargerNumber: number, spot: number) {
    this.pendingChargerSlot = spot;
    this.pendingChargerNumber = chargerNumber;
  }

}
