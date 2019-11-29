import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

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
  parkingSlotOneOccupied = false;
  parkingSlotTwoOccupied = false;
  parkingSlotThreeOccupied = false;
  parkingSlotFourOccupied = false;
  // private pendingChargerSlot$: BehaviorSubject<number>;
  // pcs: number = null;

  constructor() {
  }

  ngOnInit(): void {
    /* this.pendingChargerSlot$ = new BehaviorSubject(null);
     this.pendingChargerSlot$
       .subscribe(x => {
         if (x !== null) {
           this.pcs = x;
           console.log('pendingChargerSlot$ inside if', this.pcs)
         }
       });*/
  }

  resetPendingCharger() {
    this.pendingChargerSlot = null;
    this.pendingChargerNumber = null;
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
    console.log($event, 'parkingSpotClickHandler');
    if (this.pendingChargerNumber === 1) {
      this.chargerOneSlot = $event;
    } else {
      this.chargerTwoSlot = $event  ;
    }

    this.resetPendingCharger()
  }
}
