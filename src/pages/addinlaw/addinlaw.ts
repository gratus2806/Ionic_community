import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-addinlaw',
  templateUrl: 'addinlaw.html',
})
export class AddinlawPage {
	public unregisterBackButtonAction: any;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	finlaw:any;
	minlaw:any;
	inlawvillage:any;
	achievement:any;
	yuva:any;
	yuvak:any; 
	public user_data: any = [];  
	constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
	
	}
	

  	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
		this.navCtrl.push('BuisnessaddressPage');
		}, 100)
	}
	save(){
		let loadingPopup = this.loadingCtrl.create({
			  content: 'Saving data...'
		});
		loadingPopup.present();
		this.failure_flag = false;
		this.exist_flag = false;
		let id = window.localStorage.getItem('id');
		let finlaw = this.finlaw;
		let minlaw = this.minlaw;
		let inlawvillage = this.inlawvillage;
		let achievement= this.achievement;
		let mobile_new = window.localStorage.getItem('mobile_new');
		let data1 = JSON.stringify({mobile_new,finlaw,minlaw,inlawvillage,achievement,id});
		let link = 'http://207.180.229.30/service/addinlaw_api.php'    
		let headers = {
		  'Content-Type': 'application/json'
		};
		console.log(data1);
		this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
		 if(data.success==1){
			this.presentToastSuccess(loadingPopup);                  
		  } else {
			this.presentToastFailure1(loadingPopup);
		  } 

		},error => {
		  this.failure_flag = true;
		  this.exist_flag = false;
		  loadingPopup.dismiss().catch(() => {});
		})
	}
	presentToastFailure1(loadingPopup) {
		loadingPopup.dismiss().catch(() => {});
		let toast = this.toastCtrl.create({
		  message: 'Warning: Please Enter Properly',
		  duration: 3000,    
		  showCloseButton: true,
		  closeButtonText: 'Ok',
		  position: 'top'
		});
		toast.onDidDismiss(() => {
		  this.navCtrl.push('ResidencePage');
		});
		toast.present();
	}
	presentToastSuccess(loadingPopup) {
		loadingPopup.dismiss().catch(() => {});
		let toast = this.toastCtrl.create({
		message: 'Success:  Added Successfully Will Go to Next Page',
		duration: 3000,
		showCloseButton: true,
		closeButtonText: 'Ok',
		position: 'top'

		});
		toast.onDidDismiss(() => {
		  //console.log('Dismissed toast');
		  this.navCtrl.push('HomePage');
		});
		toast.present();
	}
	back(){
		this.navCtrl.push('AddotherdetailPage');
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad InlawPage');
	}

}
