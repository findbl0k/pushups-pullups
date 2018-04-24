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

  testTag() {
    this.platform.ready().then(() => {
      window["plugins"].OneSignal.sendTag("test", 1);
    });
  }

  buttonClick() {

    this.testTag();
    alert("test set");
  }

}
