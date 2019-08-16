import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ToastController, ViewController,LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common'
import 'rxjs/add/operator/map';
import { ProfilePage } from '../profile/profile';
import { ResidencePage } from '../residence/residence';
// import {  QualificationPage } from '../qualification/qualification';
import {  BuisnessaddressPage } from '../buisnessaddress/buisnessaddress';
import {  OtherdetailPage } from '../otherdetail/otherdetail';

@IonicPage()
@Component({
  selector: 'page-profiledata',
  templateUrl: 'profiledata.html',
})
export class ProfiledataPage {
	public unregisterBackButtonAction: any;
	tab1Root = ProfilePage;
    tab2Root = ResidencePage;
	// tab3Root = QualificationPage;
	tab3Root = BuisnessaddressPage;
	tab4Root = OtherdetailPage;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public datepipe: DatePipe,public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
  
  }

  postRequest(){
  	this.navCtrl.push('ProfilePage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfiledataPage');
  }
  ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('HomePage');
		}, 100)
	}
	back() {
		this.navCtrl.push('HomePage');
	}

}
