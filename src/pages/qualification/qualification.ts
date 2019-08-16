import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-qualification',
  templateUrl: 'qualification.html',
})
export class QualificationPage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	completed:any;
	running:any;
	jainedu:any;
  village:any;
	data: any;
	id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		this.postRequest();
	}

  postRequest() {
		//let id = this.navParams.get('id');
		let id = window.localStorage.getItem('id');
		let data = JSON.stringify({id});
		console.log(data);
		let link = 'http://207.180.229.30/service/profile_api.php';
		this.http.post(link, data).map(res => res.json()).subscribe(data=>{
			this.user_data = [];
			if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
				for(var i=0; i<data.user_datas.length;i++){
					//this.user_data.push(data.user_datas[i]);
					this.completed= data.user_datas[i].completed;
					this.running= data.user_datas[i].running;
					this.jainedu= data.user_datas[i].jainedu;
					this.village= data.user_datas[i].village;
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
		let completed = this.completed;
		let running = this.running;
		let jainedu = this.jainedu;
		let village = this.village;
		let mobile_new = window.localStorage.getItem('mobile_new');
		let data1 = JSON.stringify({mobile_new,completed,running,jainedu,village});
		let link = 'http://207.180.229.30/service/qualification_api.php'    
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
		// toast.onDidDismiss(() => {
		// 	this.navCtrl.push('ProfilePage');
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
		// 	this.navCtrl.push('BuisnessaddressPage');
		// });
		toast.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad QualificationPage');
	}

	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('ResidencePage');
		}, 100)
	}

	back() {
		this.navCtrl.push('ResidencePage');
	}

}
