import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-buisnessderictory',
  templateUrl: 'buisnessderictory.html',
})
export class BuisnessderictoryPage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	data1: any;
	status:any;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	buisness:any;
	bcity:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		let status = window.localStorage.getItem('status');
		console.log(status);
		if(status == '1'){
			this.postRequest();
		} else {
			window.localStorage.setItem('pgs', 'BuisnessderictoryPage');
			this.navCtrl.push('LoginPage');
		}
	}

  postRequest() {
		
	}
	public search() {
		let status = window.localStorage.getItem('status');
		
	        let loadingPopup = this.loadingCtrl.create({
	                content: 'Searching data...'
	        });
	        loadingPopup.present();
	        this.failure_flag = false;
	        this.exist_flag = false;
	        let buisness = this.buisness;
	        let bcity = this.bcity;
        	let data2 = JSON.stringify({ buisness,bcity});
        	let link = 'http://207.180.229.30/service/buisnesslist_api.php'    
	        let headers = {
	            'Content-Type': 'application/json'
	        };
	        console.log(data2);
	        this.http.post(link, data2).map(res => res.json()).subscribe(data=>{

	        	this.user_data = [];
				console.log(this.user_data);
				if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
					for(var i=0; i<data.user_datas.length;i++){
						this.user_data.push(data.user_datas[i]);
						console.log(data.user_datas[i]);
						loadingPopup.dismiss().catch(() => {});
					}
				} else{
					loadingPopup.dismiss().catch(() => {});
				}
	        },error => {
	            this.failure_flag = true;
	            this.exist_flag = false;
	            loadingPopup.dismiss().catch(() => {});
	        })
	    
    }
	ionViewDidLoad(){
		
		console.log('ionViewDidLoad BuisnessderictoryPage');
	}
	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('BuisnessderictoryPage');
		}, 100)
	}
	edit(id){
		this.navCtrl.push('BuisnessformPage', {
			id: id
		});
	}
	back() {
		this.navCtrl.push('HomePage');
	}
}
