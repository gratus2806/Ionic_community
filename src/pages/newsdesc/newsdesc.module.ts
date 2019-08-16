import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsdescPage } from './newsdesc';

@NgModule({
  declarations: [
    NewsdescPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsdescPage),
  ],
})
export class NewsdescPageModule {}
