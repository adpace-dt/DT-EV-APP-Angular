import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {timer} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  chargerOneSlot = 0;
  chargerTwoSlot = 0;
  pendingChargerSlot: number = null;
  pendingChargerNumber: number = null;
  slotOneChargerNumber: number = null;
  slotTwoChargerNumber = 1;
  slotThreeChargerNumber = 2;
  slotFourChargerNumber: number = null;
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

  // below will be used when refactoring for API's
  // parkingSlotOneOccupied = false;
  // parkingSlotTwoOccupied = false;
  // parkingSlotThreeOccupied = false;
  // parkingSlotFourOccupied = false;
  // private pendingChargerSlot$: BehaviorSubject<number>;

  constructor() {
  }

  ngOnInit(): void {
  }

  resetPendingCharger() {
    this.pendingChargerSlot = null;
    this.pendingChargerNumber = null;
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
              + (Math.abs(duration.seconds()) < 10 ? '0' + Math.abs(duration.seconds()) : Math.abs(duration.seconds()))
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
              + (Math.abs(duration.seconds()) < 10 ? '0' + Math.abs(duration.seconds()) : Math.abs(duration.seconds()))
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

  setCharger(chargerNumber, slot) {
    if (chargerNumber && slot) {
      if (slot === 1) {
        if (this.slotOneChargerNumber === null) {
          this.slotOneChargerNumber = chargerNumber;
          this.setStartTime(slot);
          if (this.slotTwoChargerNumber === chargerNumber) {
            this.slotTwoChargerNumber = null;
          }
          if (this.slotThreeChargerNumber === chargerNumber) {
            this.slotThreeChargerNumber = null;
          }
          if (this.slotFourChargerNumber === chargerNumber) {
            this.slotFourChargerNumber = null;
          }
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
          this.resetPendingCharger();
        } else {
          console.error('slot not empty');
        }
      }

      if (slot === 2) {
        if (this.slotTwoChargerNumber === null || this.chargerOneSlot === 0) {
          this.slotTwoChargerNumber = chargerNumber;
          this.setStartTime(slot);
          if (this.slotOneChargerNumber === chargerNumber) {
            this.slotOneChargerNumber = null;
          }
          if (this.slotThreeChargerNumber === chargerNumber) {
            this.slotThreeChargerNumber = null;
          }
          if (this.slotFourChargerNumber === chargerNumber) {
            this.slotFourChargerNumber = null;
          }
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot
          this.resetPendingCharger();
        } else {
          console.error('slot not empty');
        }
      }

      if (slot === 3) {
        if (this.slotThreeChargerNumber === null || this.chargerTwoSlot === 0) {
          this.slotThreeChargerNumber = chargerNumber;
          this.setStartTime(slot);
          if (this.slotOneChargerNumber === chargerNumber) {
            this.slotOneChargerNumber = null;
          }
          if (this.slotTwoChargerNumber === chargerNumber) {
            this.slotTwoChargerNumber = null;
          }
          if (this.slotFourChargerNumber === chargerNumber) {
            this.slotFourChargerNumber = null;
          }
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot
          this.resetPendingCharger()
        } else {
          console.error('slot not empty');
        }
      }

      if (slot === 4) {
        if (this.slotFourChargerNumber === null) {
          this.slotFourChargerNumber = chargerNumber;
          this.setStartTime(slot);
          if (this.slotOneChargerNumber === chargerNumber) {
            this.slotOneChargerNumber = null;
          }
          if (this.slotTwoChargerNumber === chargerNumber) {
            this.slotTwoChargerNumber = null;
          }
          if (this.slotThreeChargerNumber === chargerNumber) {
            this.slotThreeChargerNumber = null;
          }
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot
          this.resetPendingCharger()
        } else {
          console.error('slot not empty');
        }
      }

    }
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
  }

  parkingSpotClickHandler(slotNumber) {
    this.resetChargerStartTimestamp();
    this.setCharger(this.pendingChargerNumber, slotNumber);
  }

  resetChargerStartTimestamp() {
    if (this.pendingChargerNumber === 1) {
      switch (this.chargerOneSlot) {
        case 1:
          this.slotOneStartTimestamp = null;
          this.slotOneTimeLeft = null;
          if (this.slotOneTimer$ !== null) {
            this.slotOneTimer$.unsubscribe();
          }
          break;
        case 2:
          this.slotTwoStartTimestamp = null;
          this.slotTwoTimeLeft = null;
          if (this.slotTwoTimer$ !== null) {
            this.slotTwoTimer$.unsubscribe();
          }
          break;
        case 3:
          this.slotThreeStartTimestamp = null;
          this.slotThreeTimeLeft = null;
          if (this.slotThreeTimer$ !== null) {
            this.slotThreeTimer$.unsubscribe();
          }
          break;
        case 4:
          this.slotFourStartTimestamp = null;
          this.slotFourTimeLeft = null;
          if (this.slotFourTimer$ !== null) {
            this.slotFourTimer$.unsubscribe();
          }
          break;
      }
    } else {
      switch (this.chargerTwoSlot) {
        case 1:
          this.slotOneStartTimestamp = null;
          this.slotOneTimeLeft = null;
          if (this.slotOneTimer$ !== null) {
            this.slotOneTimer$.unsubscribe();
          }
          break;
        case 2:
          this.slotTwoStartTimestamp = null;
          this.slotTwoTimeLeft = null;
          if (this.slotTwoTimer$ !== null) {
            this.slotTwoTimer$.unsubscribe();
          }
          break;
        case 3:
          this.slotThreeStartTimestamp = null;
          this.slotThreeTimeLeft = null;
          if (this.slotThreeTimer$ !== null) {
            this.slotThreeTimer$.unsubscribe();
          }
          break;
        case 4:
          this.slotFourStartTimestamp = null;
          this.slotFourTimeLeft = null;
          if (this.slotFourTimer$ !== null) {
            this.slotFourTimer$.unsubscribe();
          }
          break;
      }
    }
  }
}
