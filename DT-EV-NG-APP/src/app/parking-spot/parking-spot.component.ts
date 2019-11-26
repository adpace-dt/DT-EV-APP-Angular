import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-parking-spot',
  templateUrl: './parking-spot.component.html',
  styleUrls: ['./parking-spot.component.scss']
})
export class ParkingSpotComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
@Input() spotNumber: number;
}
