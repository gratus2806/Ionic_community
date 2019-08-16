import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MyApp } from './app.component';
// import { IonicImageViewerModule } from 'ionic-img-viewer';
 import { MemberhomePage } from '../pages/memberhome/memberhome';
 import { MemberprofilePage } from '../pages/memberprofile/memberprofile';
 import { MemberbuisnessPage } from '../pages/memberbuisness/memberbuisness';
 import { MemberotherPage } from '../pages/memberother/memberother';
//import {MembersearchformPage } from '../pages/membersearchform/membersearchform';
import { ProfilePage } from '../pages/profile/profile';
import { ResidencePage } from '../pages/residence/residence';
// import {  QualificationPage } from '../pages/qualification/qualification';
import {  BuisnessaddressPage } from '../pages/buisnessaddress/buisnessaddress';
import {  OtherdetailPage } from '../pages/otherdetail/otherdetail';
@NgModule({
  declarations: [
    MyApp,
    MemberhomePage,
    MemberprofilePage,
    MemberbuisnessPage,
    MemberotherPage,
    ProfilePage,
    ResidencePage,
    // QualificationPage,
    BuisnessaddressPage,
    OtherdetailPage,
  ],
  imports: [
    // /IonicImageViewerModule,
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      tabsPlacement:'Bottom',
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MemberhomePage,
    MemberprofilePage,
    MemberbuisnessPage,
    MemberotherPage,
    ProfilePage,
    ResidencePage,
    // QualificationPage,
    BuisnessaddressPage,
    OtherdetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    DecimalPipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
