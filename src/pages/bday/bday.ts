import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/Rx';


@IonicPage()
@Component({
  selector: 'page-bday',
  templateUrl: 'bday.html',
})
export class BdayPage {
	public unregisterBackButtonAction: any;
	public bday_data: any = [];
	fetchdata :any;
	data1: any;
	status:any;
	url:any;
	constructor(public navCtrl: NavController, public http: Http,public toastCtrl: ToastController,public loadingCtrl: LoadingController, private viewCtrl: ViewController, public platform: Platform) {
		
		// let status = window.localStorage.getItem('status');
		// console.log(status);
		// if(status =='1'){
			this.postRequest();
		// }
		// else{
		// 	this.navCtrl.push('HomePage');
		// }
	}
	postRequest() {
		let loadingPopup = this.loadingCtrl.create({
          content: 'Authenticating data...'
        });
		let data1 = '';
		let link = 'http://207.180.229.30/service/customer_bday_api.php';
		this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
			this.bday_data = [];
			console.log(this.bday_data);
	  		if(data.hasOwnProperty('bday_datas') && data.bday_datas.length > 0){
				for(var i=0; i<data.bday_datas.length;i++){
		  			this.bday_data.push(data.bday_datas[i]);
		  			console.log(data.bday_datas[i]);
				}
	  		}
		}, error => {
	  		alert(error.message);
		})

	}
	// urlcheck(){

	// 	let url = this.url;
		
	// 	let data1 = JSON.stringify({url});
	// 	let link = 'http://207.180.229.30/service/residence_api.php'    
	// 	let headers = {
	// 		'Content-Type': 'application/json'
	// 	};
	// 	console.log(data1);
	// 	this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
	// 		console.log(data.success);
		 

	// 	},error => {
			
	// 	})
	// }
	
  	back() {
		this.navCtrl.push('HomePage');
	}
	ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('HomePage');
	    }, 100)
	}
	ionViewDidLoad() {
			console.log('ionViewDidLoad BdayPage')
	}
}
