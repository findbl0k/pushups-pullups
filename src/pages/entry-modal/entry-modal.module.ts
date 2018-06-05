import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EntryModalPage } from './entry-modal';

@NgModule({
  declarations: [
    EntryModalPage,
  ],
  imports: [
    IonicPageModule.forChild(EntryModalPage),
  ],
})
export class EntryModalPageModule {}
