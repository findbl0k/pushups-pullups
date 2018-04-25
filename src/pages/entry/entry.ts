import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DataService } from '../../services/dataService';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html',
})
export class EntryPage {

  dataService;
  new: any = false;
  intervalList: any = [{option: 0, description: "Every day"},
    {option: 1, description: "Every other day"},
    {option: 2, description: "Every third day"}
  ];

  model: any = {name: null, reminder: false, time: null, interval: null};

  constructor(public navCtrl: NavController, private platform: Platform, public data: DataService) {

  }

  ionViewWillEnter() {
    //this.dataService = this.data.dataService.getValue();
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
