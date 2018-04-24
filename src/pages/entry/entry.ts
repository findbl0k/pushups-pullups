import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { DataService } from '../../services/dataService';

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html'
})
export class EntryPage {

  dataService;

  constructor(public navCtrl: NavController, private platform: Platform,) {

  }

  setTag(tag, value) { //tag must be string, value is num or string
    this.platform.ready().then(() => {
      window["plugins"].OneSignal.sendTag(tag, value);
    });
  }

  createActivity() { //creates a new activity

  }

  destroyActivity() {//WARNING: PERMANENTLY DESTROYS AN ACTIVITY AND ALL DATA

  }

  updateToday() { //updates local storage and observable with user values


    this.updateTags();
  }

  updateTags() { //runs checks and updates onesignal data tags

    this.setTag("test", 1);
    alert("test tag set");
  }

}
