import { Action } from '@ngrx/store';

export enum ActivesafeActionTypes {
  LoadActivesafes = '[Activesafe] Load Activesafes'
}

export class LoadActivesafes implements Action {
  readonly type = ActivesafeActionTypes.LoadActivesafes;
}

export type ActivesafeActions = LoadActivesafes;
