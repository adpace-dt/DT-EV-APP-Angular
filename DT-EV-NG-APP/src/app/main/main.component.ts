import {Component, OnDestroy, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {Subscription} from 'rxjs';
import {timer} from 'rxjs';

import {MessageService} from '../../services/charger.service';
// import {ChargerService} from '../../services/charger.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, OnChanges {
  subscription: Subscription;
  data: any[] = [];
  messages: any[] = [];
  chargerDataSubscription: Subscription;
  chargerData$: Subscription;
  chargerData: object;

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

  constructor(private messageService: MessageService) {
    console.log('constructor hit');
    this.subscription = this.messageService.getMessage().subscribe(message => {

      // console.log('message', message);
      if (message) {
        this.messages.push(message);
        console.log('message', message);
      } else {
        // clear messages when empty message received
        this.data = [];
      }
    });

    // console.log('main constructor');
    // this.chargerDataSubscription = this.chargerService.getChargerData()
    //   // .subscribe(data => console.log('main constuctor', data));
    //   .subscribe(data => {this.chargerData = data; });
    // console.log('from main constructor', this.chargerData);

  }

  sendMessage(): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage({text: 'Message from Home Component to App Component!'});
  }

  ngOnInit(): void {
    // this.chargerService.getChargerData();
    // console.log(this.chargerData);
  }

  getData(): void {
    // this.chargerService.getChargerData();
    // console.log(this.chargerData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.chargerData$ = this.chargerService.getChargerData()
    //   .subscribe(data => this.chargerData = data);
    // console.log('from onChanges', this.chargerData);
  }

  ngOnDestroy() {
    this.chargerData$.unsubscribe();
  }

  resetPendingCharger() {
    // this.chargerService.resetPendingCharger();
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
  }

  setAllSlotsNull(chargerNumber: number) {
    // this.chargerService.setAllSlotsNull(chargerNumber);
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
  }

  setCharger(chargerNumber, slot) {
    // this.chargerService.setCharger(chargerNumber, slot);
    if (chargerNumber && (slot || slot === 0)) {
      // slot === 0 is called for a charger disconnect event
      if (slot === 0) {
        this.setAllSlotsNull(chargerNumber);
        // set the charger to a default slot
        if (chargerNumber === 1) {
          this.chargerOneSlot = 0;
          if (this.slotTwoChargerNumber === 2) {
            this.slotThreeChargerNumber = 1;
          } else {
            this.slotTwoChargerNumber = 1;
          }
        } else { // Charger === 2
          this.chargerTwoSlot = 0;
          if (this.slotThreeChargerNumber === 1) {
            this.slotTwoChargerNumber = 2;
          } else {
            this.slotThreeChargerNumber = 2;
          }
        }
        this.resetPendingCharger();
      }

      if (slot === 1) {
        if (this.slotOneChargerNumber === null) {
          this.setAllSlotsNull(chargerNumber);
          this.slotOneChargerNumber = chargerNumber;
          this.setStartTime(slot);
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
              this.setStartTime(slot);
            } else if (this.chargerTwoSlot === 2) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 1;
              this.chargerOneSlot = 2;
              this.setStartTime(slot);
            }
          } else { // chargerNumber === 2
            if (this.chargerOneSlot === 0 && this.slotTwoChargerNumber === 1) {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 1;
              this.slotTwoChargerNumber = 2;
              this.chargerTwoSlot = 2;
              this.setStartTime(slot);
            } else if (this.chargerOneSlot === 2) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 2;
              this.chargerTwoSlot = 2;
              this.setStartTime(slot);
            }
          }
        }

        if (this.slotTwoChargerNumber === null) {
          this.setAllSlotsNull(chargerNumber);
          this.slotTwoChargerNumber = chargerNumber;
          this.setStartTime(slot);
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
              this.setStartTime(slot);
            } else if (this.chargerTwoSlot === 3) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 1;
              this.chargerOneSlot = 3;
              this.setStartTime(slot);
            }
          } else { // chargerNumber === 2
            if (this.chargerOneSlot === 0 && this.slotThreeChargerNumber === 1) {
              this.setAllSlotsNull(chargerNumber);
              this.slotTwoChargerNumber = 1;
              this.slotThreeChargerNumber = 2;
              this.chargerTwoSlot = 3;
              this.setStartTime(slot);
            } else if (this.chargerOneSlot === 3) {
              console.warn('slot not empty');
            } else {
              this.setAllSlotsNull(chargerNumber);
              this.slotThreeChargerNumber = 2;
              this.chargerTwoSlot = 3;
              this.setStartTime(slot);
            }
          }
        } else if (this.slotThreeChargerNumber === null) {
          // check to see if there is a default charger set in this slot
          this.setAllSlotsNull(chargerNumber);
          this.slotThreeChargerNumber = chargerNumber;
          this.setStartTime(slot);
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
        }
        this.resetPendingCharger();
      }

      if (slot === 4) {
        if (this.slotFourChargerNumber === null) {
          this.setAllSlotsNull(chargerNumber);
          this.slotFourChargerNumber = chargerNumber;
          this.setStartTime(slot);
          chargerNumber === 1 ? this.chargerOneSlot = slot : this.chargerTwoSlot = slot;
          this.resetPendingCharger();
        } else {
          console.warn('slot not empty');
        }
      }
    }
  }

  consoleLogData() {
    console.log('chargerOneSlot: ', this.chargerOneSlot);
    console.log('chargerTwoSlot: ', this.chargerTwoSlot);
    console.log('pendingChargerSlot: : ', this.pendingChargerSlot);
    console.log('pendingChargerNumber: ', this.pendingChargerNumber);
    console.log('slotOneChargerNumber: ', this.slotOneChargerNumber);
    console.log('slotTwoChargerNumber: ', this.slotTwoChargerNumber);
    console.log('slotThreeChargerNumber: ', this.slotThreeChargerNumber);
    console.log('slotFourChargerNumber: ', this.slotFourChargerNumber);
  }

  chargerClickHandler($event) {
    // this.chargerService.chargerClickHandler($event);
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

  parkingSpotClickHandler(payload) {
    console.log('parkingSpotClickHandler(payload):', payload);
    if (payload.disconnect) {
      this.setTimerToNull(payload.spot);
      this.pendingChargerSlot = payload.spot;
      this.pendingChargerNumber = payload.chargerNumber;
      this.setCharger(payload.chargerNumber, 0);
      payload.chargerNumber === 1 ? this.chargerOneSlot = 0 : this.chargerTwoSlot = 0;
      // payload.chargerNumber === 1 ? this.chargerService.setChargerOneSlot(0) : this.chargerTwoSlot = 0;
      this.consoleLogData();
    } else {
      this.resetChargerStartTimestamp();
      this.setCharger(this.pendingChargerNumber, payload.spot);
      // this.chargerService.setCharger(this.pendingChargerNumber, payload.spot);
      // this.consoleLogData();
      // console.log('charger data', this.chargerData);
    }
  }
}
