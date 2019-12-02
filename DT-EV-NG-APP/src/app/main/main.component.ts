import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {interval, timer} from "rxjs";
import { take} from "rxjs/operators";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  chargerOneSlot = 2;
  chargerTwoSlot = 3;
  pendingChargerSlot: number = null;
  pendingChargerNumber: number = null;
  slotOneChargerNumber: number = null;
  slotTwoChargerNumber: number = 1;
  slotThreeChargerNumber: number = 2;
  slotFourChargerNumber: number = null;
  slotOneTimeLeft$: any = null;
  slotTwoTimeLeft: number = 1;
  slotThreeTimeLeft: number = 2;
  slotFourTimeLeft: number = null;
  currentTime: any = moment();

  // below will be used when refactoring for API's
  // parkingSlotOneOccupied = false;
  // parkingSlotTwoOccupied = false;
  // parkingSlotThreeOccupied = false;
  // parkingSlotFourOccupied = false;
  // private pendingChargerSlot$: BehaviorSubject<number>;

  constructor() {
  }

  mySubject$;

  ngOnInit(): void {
    this.mySubject$ = new BehaviorSubject(0);
    this.mySubject$.next(this.currentTime);
    timer(0, 1000)
      .subscribe(() => {
        let time = moment();
        let end = moment(this.currentTime).add(3, 'hours');
        let duration = moment.duration(time.diff(end));
        // let seconds = duration.asSeconds();
        // let remaining = Math.abs(duration.hours()) + ':' + Math.abs(duration.minutes()) + ':' + Math.abs(duration.seconds())
        this.slotOneTimeLeft$ = Math.abs(duration.hours()) + ':' + Math.abs(duration.minutes()) + ':' + Math.abs(duration.seconds());
      });
  }

  resetPendingCharger() {
    this.pendingChargerSlot = null;
    this.pendingChargerNumber = null;
  }

  setCharger(chargerNumber, slot) {
    if (chargerNumber && slot) {
      if (slot === 1) {
        if (this.slotOneChargerNumber === null) {
          this.slotOneChargerNumber = chargerNumber;
          if (this.slotTwoChargerNumber === chargerNumber) {
            this.slotTwoChargerNumber = null;
          }
          if (this.slotThreeChargerNumber === chargerNumber) {
            this.slotThreeChargerNumber = null;
          }
          if (this.slotFourChargerNumber === chargerNumber) {
            this.slotFourChargerNumber = null;
          }
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot
          this.resetPendingCharger()
        } else console.log('slot not empty');
      }

      if (slot === 2) {
        if (this.slotTwoChargerNumber === null) {
          this.slotTwoChargerNumber = chargerNumber;
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
          this.resetPendingCharger()
        } else console.log('slot not empty');
      }

      if (slot === 3) {
        if (this.slotThreeChargerNumber === null) {
          this.slotThreeChargerNumber = chargerNumber;
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
        } else console.log('slot not empty');
      }

      if (slot === 4) {
        if (this.slotFourChargerNumber === null) {
          this.slotFourChargerNumber = chargerNumber;
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
        } else console.log('slot not empty');
      }

    }
  }

  chargerClickHandler($event) {
    if (this.pendingChargerSlot === null) {
      this.pendingChargerSlot = $event.slotNumber;
      this.pendingChargerNumber = $event.chargerNumber;
    } else if (this.pendingChargerSlot === $event.slotNumber) { //if the user clicks the charger a second time
      this.resetPendingCharger()
    } else if (this.pendingChargerSlot !== null && this.pendingChargerSlot !== $event.slotNumber) {
      this.pendingChargerSlot = $event.slotNumber;
      this.pendingChargerNumber = $event.chargerNumber;
    }
  }

  parkingSpotClickHandler($event) {
    if (this.pendingChargerNumber === 1) {
      switch ($event) {
        case 1 : {
          this.setCharger(1, 1)
          break;
        }
        case 2 : {
          this.setCharger(1, 2);
          break;
        }
        case 3 : {
          this.setCharger(1, 3);
          break;
        }
        case 4 : {
          this.setCharger(1, 4);
          break;
        }
      }
    } else {
      switch ($event) {
        case 1 : {
          this.setCharger(2, 1);
          break;
        }
        case 2 : {
          this.setCharger(2, 2);
          break;
        }
        case 3 : {
          this.setCharger(2, 3);
          break;
        }
        case 4 : {
          this.setCharger(2, 4);
          break;
        }
      }
    }

    this.resetPendingCharger()
  }
}
