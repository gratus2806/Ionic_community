import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-residence',
  templateUrl: 'residence.html',
})
export class ResidencePage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	data: any;
	id: any;
	fetchdata: any;
	address1: any;
	address2: any;
	address3:any;
	city:any;
	state:any;
	postalcode:any;
	country:any;
	email:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		this.postRequest();
	}

  postRequest() {
		//let id = this.navParams.get('id');
		let id = window.localStorage.getItem('id');
		let data2 = JSON.stringify({id});
		console.log(data2);
		let link = 'http://207.180.229.30/service/profile_api.php';
		this.http.post(link, data2).map(res => res.json()).subscribe(data=>{
			this.user_data = [];
			if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
				for(var i=0; i<data.user_datas.length;i++){
					//this.user_data.push(data.user_datas[i]);
				  this.address1= data.user_datas[i].address1;
				  this.address2= data.user_datas[i].address2;
				  this.address3= data.user_datas[i].address3;
				  this.city= data.user_datas[i].city;
				  this.state= data.user_datas[i].state;
				  this.postalcode= data.user_datas[i].postalcode;
				  this.country= data.user_datas[i].country;
				  this.email= data.user_datas[i].email;
				}
			}
			console.log(this.user_data);
		}, error => {
			alert(error.message);
		})
			
	}
	save(){
		let loadingPopup = this.loadingCtrl.create({
				content: 'Saving data...'
		});
		loadingPopup.present();
		this.failure_flag = false;
		this.exist_flag = false;
		let address1 = this.address1;
		let address2 = this.address2;
		let address3 = this.address3;
		let city = this.city
		let state = this.state;
		let postalcode = this.postalcode;
		let country = this.country;
		let email = this.email;
		let mobile_new = window.localStorage.getItem('mobile_new');
		let data1 = JSON.stringify({mobile_new,address1,address2,address3,city,state,postalcode,country,email});
		let link = 'http://207.180.229.30/service/residence_api.php'    
		let headers = {
			'Content-Type': 'application/json'
		};
		console.log(data1);
		this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
			console.log(data.success);
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
		// toast.onDidDismiss(() => {
		// 	this.navCtrl.push('ResidencePage');
		// });
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
		// toast.onDidDismiss(() => {
		// 	//console.log('Dismissed toast');
		// 	this.navCtrl.push('QualificationPage');
		// });
		toast.present();
	}
		
	

	ionViewDidLoad() {
		console.log('ionViewDidLoad QualificationPage');
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
