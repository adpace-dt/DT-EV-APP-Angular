import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  chargerOneSlot = 2;
  chargerTwoSlot = 3;
  pendingChargerSlot: number = null;
  parkingSlotOneOccupied = false;
  parkingSlotTwoOccupied = false;
  parkingSlotThreeOccupied = false;
  parkingSlotFourOccupied = false;

  constructor() {
  }

  ngOnInit() {
  }

  chargerClickHandler($event) {
    this.pendingChargerSlot = $event;
  }
}
