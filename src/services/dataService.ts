import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import 'rxjs/add/operator/finally';

@Injectable()
export class DataService {

  userInfo: any;
  userWorkouts: any;

  public workoutData = new BehaviorSubject(null);
  public userData = new BehaviorSubject(null);

  constructor(public http: HttpClient) {
    this.userInfo = this.getStorageVariable('user_info');
    this.userWorkouts = this.getStorageVariable('user_workouts');

    this.workoutData.next(this.userWorkouts); //set the observables from stored data
    this.userData.next(this.userInfo);
  }

  private getStorageVariable(name) {
    return JSON.parse(window.localStorage.getItem(name));
  }

  private setStorageVariable(name, data) {
    window.localStorage.setItem(name, JSON.stringify(data));
  }

  public setUserInfo(payload) {
    this.setStorageVariable('user_info', payload); //set local storage
    this.userData.next(payload); //update observable
  }

  public setUserWorkouts(payload) {
    this.setStorageVariable('user_workouts', payload);  //set local storage
    this.workoutData.next(payload); //update observable
  }

  public createUser() { //initializes localstorage and updates observables with blank object/array
      this.setUserInfo({});
      this.setUserWorkouts([]);
  }

  public destroy() {
    //WARNING: TRIGGERING THIS FUNCTION DESTROYS ALL LOCAL DATA!
    window.localStorage.removeItem('user_info');
    window.localStorage.removeItem('user_workouts');

    //delete observable data
    this.workoutData.next(null);
    this.userData.next(null);

    this.userInfo = null;
    this.userWorkouts = null;
  }
}
