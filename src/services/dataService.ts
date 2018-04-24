import { Injectable } from '@angular/core';
import { Http} from "@angular/http";
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import 'rxjs/add/operator/finally';

@Injectable()
export class DataService {

  userInfo: any;
  userWorkouts: any;

  public dataService = new BehaviorSubject(null);

  constructor(public http: Http) {

    this.userInfo = this.getStorageVariable('user_info');
    this.userWorkouts = this.getStorageVariable('user_workouts');
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  private setUserInfo(payload) {
    this.setStorageVariable('user_info', payload);
  }

  private setUserWorkouts(payload) {
    this.setStorageVariable('user_workouts', payload);
  }

  public login() {

      this.setUserInfo(null);
      this.setUserWorkouts(null);
  }

  public destroy() {
    //WARNING: TRIGGERING THIS FUNCTION DESTROYS ALL LOCAL DATA!
    window.localStorage.removeItem('user_info');
    window.localStorage.removeItem('user_workouts');

    //delete observable data
    this.dataService.next(null);

    this.userInfo = null;
    this.userWorkouts = null;
  }
}
