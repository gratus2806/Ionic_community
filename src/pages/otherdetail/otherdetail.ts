import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-otherdetail',
  templateUrl: 'otherdetail.html',
})
export class OtherdetailPage {
	public unregisterBackButtonAction: any;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	kuldevta:any;
	todatype:any;
	lahanu:any;
	sahyog:any;
	yuva:any;
	yuvak:any;
	completed:any;
	running:any;
	jainedu:any;
	village:any;
	finlaw:any;
	minlaw:any;
	inlawvillage:any;
	achievement:any;
	public user_data: any = [];

	constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
	this.postRequest();
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad OtherdetailPage');
	}
	postRequest() {
		let id = window.localStorage.getItem('id');
		let data = JSON.stringify({id});
		let link = 'http://207.180.229.30/service/profile_api.php';
		this.http.post(link, data).map(res => res.json()).subscribe(data=>{
			this.user_data = [];
			if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
				for(var i=0; i<data.user_datas.length;i++){
					//this.user_data.push(data.user_datas[i]);
                    this.kuldevta= data.user_datas[i].kuldevta;
                    this.todatype= data.user_datas[i].todatype;
                    this.lahanu= data.user_datas[i].lahanu;
                    this.sahyog= data.user_datas[i].sahyog;
                    this.yuva= data.user_datas[i].yuva;
                    this.yuvak= data.user_datas[i].yuvak;
                    this.completed= data.user_datas[i].completed;
                    this.running= data.user_datas[i].running;
					this.jainedu= data.user_datas[i].jainedu;
					this.village= data.user_datas[i].village;
					this.finlaw= data.user_datas[i].finlaw;
                	this.minlaw= data.user_datas[i].minlaw;
                	this.inlawvillage= data.user_datas[i].inlawvillage;
                	this.achievement= data.user_datas[i].achievement;
				}
			}
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
		let kuldevta = this.kuldevta;
		let todatype = this.todatype;
		let lahanu = this.lahanu;
		let sahyog= this.sahyog;
		let yuva = this.yuva;
		let yuvak = this.yuvak;
		let completed = this.completed;
		let running = this.running;
		let jainedu = this.jainedu;
		let village = this.village;
		let finlaw = this.finlaw;
		let inlawvillage = this.inlawvillage;
		let achievement = this.achievement;
		let minlaw = this.minlaw;
		let mobile_new = window.localStorage.getItem('mobile_new');
		let data1 = JSON.stringify({mobile_new,kuldevta,todatype,lahanu,sahyog,yuva,yuvak,completed,running,jainedu,village,finlaw,minlaw,inlawvillage,achievement});
		let link = 'http://207.180.229.30/service/otherdetails_api.php'    
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
		// 	this.navCtrl.push('HomePage');
		// });
		toast.present();
	}
	ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('HomePage');
	    }, 100)
	}
	back(){
		this.navCtrl.push('HomePage');
	}
}


