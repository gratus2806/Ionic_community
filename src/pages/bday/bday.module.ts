import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BdayPage } from './bday';

@NgModule({
  declarations: [
    BdayPage,
  ],
  imports: [
    IonicPageModule.forChild(BdayPage),
  ],
})
export class BdayPageModule {}
