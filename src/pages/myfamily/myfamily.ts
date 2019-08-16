import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController,AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-myfamily',
  templateUrl: 'myfamily.html',
})
export class MyfamilyPage {

  public unregisterBackButtonAction: any;
	public user_data: any = [];
	//public user_data_all: any = [];
	data1: any;
	slideSearchForm: FormGroup;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	status:any;
	fetchdata: any;
	firstname:any;
	fathername:any;
	city:any;
	constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public formBuilder: FormBuilder,public loadingCtrl: LoadingController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		let status = window.localStorage.getItem('status');
        if(status == '1'){
        	this.search();
        } else {
        	this.navCtrl.push('LoginPage');
        }
     }
	
	ionViewDidLoad(){
		console.log('ionViewDidLoad MembersearchPage');
	}
	

	public search() {
	        this.failure_flag = false;
	        this.exist_flag = false;
	        let family_no = window.localStorage.getItem('family_no'); 
      		let data2 = JSON.stringify({family_no});
        	let link = 'http://207.180.229.30/service/myfamily_api.php'    
	        let headers = {
	            'Content-Type': 'application/json'
	        };
	        console.log(data2);
	        this.http.post(link, data2).map(res => res.json()).subscribe(data=>{
	        	this.user_data = [];
				//this.user_data_all = [];
				if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
					for(var i=0; i<data.user_datas.length;i++){
						this.user_data.push(data.user_datas[i]);
					}
				}
	        },error => {
	            this.failure_flag = true;
	            this.exist_flag = false;
	        })
	   
    }
	// ionViewWillEnter() {
	// 	this.viewCtrl.showBackButton(false);
	// 	this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	// 		this.navCtrl.push('MembersearchPage');
	// 	}, 100)
	// }

	edit(id){
		this.navCtrl.push('MyfamilyformPage', {
			id: id
		});
	}

	
}