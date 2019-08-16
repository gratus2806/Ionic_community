import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembersearchPage } from './membersearch';

@NgModule({
  declarations: [
    MembersearchPage,
  ],
  imports: [
    IonicPageModule.forChild(MembersearchPage),
  ],
})
export class MembersearchPageModule {}
