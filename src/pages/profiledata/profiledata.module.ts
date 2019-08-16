import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfiledataPage } from './profiledata';

@NgModule({
  declarations: [
    ProfiledataPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfiledataPage),
  ],
})
export class ProfiledataPageModule {}
