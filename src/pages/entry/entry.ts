import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DataService } from '../../services/dataService';

import { Activity } from './../../activity';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  workoutData;
  userData;
  reps: number;
  sets: number;
  showMe: any;

  new: any = false;

  intervalList: any = [{option: 0, description: "Every day"},
    {option: 1, description: "Every other day"},
    {option: 2, description: "Every third day"}
  ];

  model: any = {name: null, reminder: false, remindTime: null, interval: null};

  constructor(public navCtrl: NavController, private platform: Platform, public data: DataService) {
    this.showMe = new Array(100); //max activities = 100
  }

  ionViewWillEnter() {
    this.data.login();

    this.workoutData = this.data.workoutData.getValue();
    this.userData = this.data.userData.getValue();

    alert(JSON.stringify(this.workoutData));
  }

  setTag(tag, value) { //tag must be string, value is num or string
    this.platform.ready().then(() => {
      window["plugins"].OneSignal.sendTag(tag, value);
    });
  }

  startCreating() {
    this.new = true;
  }

  createActivity() { //creates a new activity

    alert('creating activity')

    let newActivity = new Activity(this.model.name, this.model.reminder, this.model.remindTime, new Date(), []);
    if(this.workoutData===null){
      this.data.createUser(); //sets user data to empty object and user workouts to an empty array

      this.workoutData = this.data.workoutData.getValue(); //update local data after user creation
      this.userData = this.data.userData.getValue();
    }

    this.workoutData.push(newActivity); //add new activity to workout array
    this.data.setUserWorkouts(this.workoutData); //update workout data with new activity

    this.new = false;
  }

  destroyActivity() { //WARNING: PERMANENTLY DESTROYS AN ACTIVITY AND ALL DATA

  }

  showActivity(i) { //expand card for user entry
    this.showMe[i] = 1;
  }

  hideActivity(i) { //expand card for user entry
    this.showMe[i] = 0;
  }

  updateActivity(i) { //updates local storage and observable with user's workout values
    alert(this.workoutData[i].name);
    alert(this.reps);
    alert(this.sets);

    let today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1; //January is 0!
    const yyyy = today.getFullYear();

    const todayDateTime = mm + '/' + dd + '/' + yyyy

    const todaysData = [todayDateTime, this.reps, this.sets];

    alert(JSON.stringify(todaysData));

    const numWorkouts = this.workoutData[i].workouts.length;
    alert(numWorkouts);

    if(numWorkouts>0){
      if(this.workoutData[i].workouts[numWorkouts-1][0]===todayDateTime){
        //check if today is already set. Promp to update if already set. Else, store data.
        alert('DATA ALREADY SET FOR TODAY!');
      }
      else this.workoutData[i].workouts.push(todaysData);
    }
    else this.workoutData[i].workouts.push(todaysData);

    this.data.setUserWorkouts(this.workoutData); //update workout data with new activity

    this.updateTags();
  }

  updateTags() { //runs checks and updates onesignal data tags
    this.setTag("test", 1);
    alert("test tag set");
  }

}
