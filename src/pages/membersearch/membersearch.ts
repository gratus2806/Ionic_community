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
  selector: 'page-membersearch',
  templateUrl: 'membersearch.html',
})
export class MembersearchPage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	public user_data_all: any = [];
	data1: any;
	slideSearchForm: FormGroup;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	status:any;
	fetchdata: any;
	firstname:string;
	fathername:string;
	city:string;
	constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController,public formBuilder: FormBuilder,public loadingCtrl: LoadingController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		let status = window.localStorage.getItem('status');
        console.log(status);
        if(status =='1'){
            let firstname = this.navParams.get('firstname');
		let fathername = this.navParams.get('fathername');
		let city = this.navParams.get('city');
		
		if(firstname !='' && firstname !=undefined  || fathername!='' && fathername!=undefined  || city!='' && city!=undefined){
			// alert(JSON.stringify(firstname));
			// alert(JSON.stringify(fathername));
			// alert(JSON.stringify(city));
			this.firstname =firstname;
			this.fathername =fathername;
			this.city =city;
			this.search();
			
			
		} 
        } else {
            window.localStorage.setItem('pgs', 'MembersearchPage');
            this.navCtrl.push('LoginPage');
        }
		
		
	}
	
	
	ionViewDidLoad(){
		console.log('ionViewDidLoad MembersearchPage');
	}
	

	public search() {
		let status = window.localStorage.getItem('status');
		if(status=='1'){
	        let loadingPopup = this.loadingCtrl.create({
	                content: 'Searching data...'
	        });
	        loadingPopup.present();
	        this.failure_flag = false;
	        this.exist_flag = false;
	        let firstname = this.firstname;
	        let fathername = this.fathername;
	        let city = this.city;
        	let data2 = JSON.stringify({ firstname,fathername,city});
        	let link = 'http://207.180.229.30/service/memberlist_api.php'    
	        let headers = {
	            'Content-Type': 'application/json'
	        };

	        console.log(data2);
	        this.http.post(link, data2).map(res => res.json()).subscribe(data=>{
	        	this.user_data = [];
				console.log(this.user_data);
				this.user_data_all = [];
				if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
					for(var i=0; i<data.user_datas.length;i++){
						this.user_data.push(data.user_datas[i]);
						loadingPopup.dismiss().catch(() => {});
					}
				}else{
					loadingPopup.dismiss().catch(() => {});
				}
	        },error => {
	            this.failure_flag = true;
	        	this.exist_flag = false;
	            loadingPopup.dismiss().catch(() => {});
	        })
	    } else {
	    	window.localStorage.setItem('pgs', 'MembersearchPage');
	    	this.navCtrl.push('LoginPage');
	    }
    }

    presentToaststatus() {
	    let toast = this.toastCtrl.create({
	    	message: 'Warning: Please enter in the field of father name or name',
	    	duration: 3000,	
	    	showCloseButton: true,
	  		closeButtonText: 'Ok',
	  		position: 'top'
	    });
	    toast.onDidDismiss(() => {
			this.navCtrl.push('MembersearchformPage');
		});
	    toast.present();
	}
	
	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('HomePage');
		}, 100)
	}

	edit(search_id){
		this.navCtrl.push('MembersearchformPage', {
			firstname:this.firstname,
			fathername:this.fathername,
			city:this.city,
			search_id: search_id

		});
	}
	

	back() {
		this.navCtrl.push('HomePage');
	}
}