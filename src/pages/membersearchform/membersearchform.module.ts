import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MembersearchformPage } from './membersearchform';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import { MemberhomePage } from '../memberhome/memberhome';
//  import { MemberprofilePage } from '../memberprofile/memberprofile';
//  import { MemberbuisnessPage } from '../memberbuisness/memberbuisness';
//  import { MemberotherPage } from '../memberother/memberother';
@NgModule({
  declarations: [
    MembersearchformPage,
    // MemberhomePage,
    // MemberprofilePage,
    // MemberbuisnessPage,
    // MemberotherPage,
  ],
  imports: [
    IonicPageModule.forChild(MembersearchformPage),
    // IonicModule.forRoot(MembersearchformPage,{
    //   tabsPlacement:'Bottom',
    // })
  ],
})
export class MembersearchformPageModule {}
