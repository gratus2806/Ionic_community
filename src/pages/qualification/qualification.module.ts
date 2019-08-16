import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QualificationPage } from './qualification';

@NgModule({
  declarations: [
    QualificationPage,
  ],
  imports: [
    IonicPageModule.forChild(QualificationPage),
  ],
})
export class QualificationPageModule {}
