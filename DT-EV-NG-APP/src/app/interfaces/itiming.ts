import { Subscription } from 'rxjs';

export interface ITiming {
  slotOneTimeLeft: string;
  slotTwoTimeLeft: string;
  slotThreeTimeLeft: string;
  slotFourTimeLeft: string;
  slotOneStartTimestamp: any;
  slotTwoStartTimestamp: any;
  slotThreeStartTimestamp: any;
  slotFourStartTimestamp: any;
  slotOneTimer$: Subscription;
  slotTwoTimer$: Subscription;
  slotThreeTimer$: Subscription;
  slotFourTimer$: Subscription;
}
