import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IParkingData} from '../app/interfaces/iparking-data';

@Injectable({
  providedIn: 'root'
})
export class SpotOccupiedService {
  spotOccupiedDataSubject = new BehaviorSubject<IParkingData>(null);
  spotOneIsOccupied: boolean;
  spotTwoIsOccupied: boolean;
  spotThreeIsOccupied: boolean;
  spotFourIsOccupied: boolean;

  constructor() {
    this.setSpotOccupiedData();
  }

  setSpotOccupiedData() {
    // tslint:disable-next-line:variable-name
    const _data = {
      spotOneIsOccupied: this.spotOneIsOccupied,
      spotTwoIsOccupied: this.spotTwoIsOccupied,
      spotThreeIsOccupied: this.spotThreeIsOccupied,
      spotFourIsOccupied: this.spotFourIsOccupied
    };
    this.spotOccupiedDataSubject.next(_data);
  }

  getSpotOccupiedData() {
    return this.spotOccupiedDataSubject.asObservable();
  }
}
