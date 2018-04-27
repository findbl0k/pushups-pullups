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

  new: any = false;

  intervalList: any = [{option: 0, description: "Every day"},
    {option: 1, description: "Every other day"},
    {option: 2, description: "Every third day"}
  ];

  model: any = {name: null, reminder: false, time: null, interval: null};

  constructor(public navCtrl: NavController, private platform: Platform, public data: DataService) {

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

    let newActivity = new Activity(this.model.name, this.model.reminder, new Date(), []);
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

  updateToday() { //updates local storage and observable with user values
    this.updateTags();
  }

  updateTags() { //runs checks and updates onesignal data tags
    this.setTag("test", 1);
    alert("test tag set");
  }

}
