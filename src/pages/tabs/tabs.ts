import { Component } from '@angular/core';

import { ChartsPage } from '../charts/charts';
import { EntryPage } from '../entry/entry';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChartsPage;
  tab3Root = EntryPage;

  constructor() {

  }
}
