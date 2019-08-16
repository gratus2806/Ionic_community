import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';
 import { MemberhomePage } from '../memberhome/memberhome';
 import { MemberprofilePage } from '../memberprofile/memberprofile';
 import {  MemberbuisnessPage } from '../memberbuisness/memberbuisness';
  import {  MemberotherPage } from '../memberother/memberother';
// import { Tab1 } from './tab1-page';
// import { Tab2 } from './tab2-page';

@IonicPage()
@Component({
 	selector: 'page-membersearchform',
 	templateUrl: 'membersearchform.html',
})
export class MembersearchformPage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	data1: any;
	id: any;
	public user_data_all: any = [];
	firstname:any;
	fathername:any;
	city:any;
	fetchdata:any;
	family_no:any;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	 tab1Root = MemberhomePage;
	 tab2Root = MemberprofilePage;
	 tab3Root = MemberbuisnessPage;
	 tab4Root = MemberotherPage;
	constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		 this.postRequest();
		this.update();
	}
	postRequest() {
      	let currentuser = {
			search_id:this.navParams.get('search_id'),
			
  	  	};
	  	window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      	window.localStorage.setItem('search_id',this.navParams.get('search_id'));
      	
  	}
  	update(){
	    let id = this.navParams.get('search_id'); 
      	let data = JSON.stringify({id});
  		console.log(data);
  		let link = 'http://207.180.229.30/service/familyno_api.php'
  		this.http.post(link, data).map(res => res.json()).subscribe(data=>{
	        this.fetchdata =data;
	        let user_datas = this.fetchdata.user_datas;
	        //alert(JSON.stringify(data));
    		let currentuser = {
    			family_no:user_datas.family_no,
  	  		};
          	window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
          	window.localStorage.setItem('family_no',user_datas.family_no);
          	console.log(user_datas.family_no);
  		}, error => {
  		})	
	}
	ionViewDidLoad() {
	    console.log('ionViewDidLoad MembersearchformPage');
	}

	ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('MembersearchPage');
	    }, 100)
	}
	goto(){
		this.navCtrl.push('MyfamilyPage');
	}

	back() {
	  	this.navCtrl.push('MembersearchPage', {
			firstname:this.navParams.get('firstname'),
			fathername:this.navParams.get('fathername'),
			city:this.navParams.get('city'),
		});
	  	// console.log(this.navParams.get('firstname'));
	}
}