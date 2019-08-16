import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-buisnessform',
  templateUrl: 'buisnessform.html',
})
export class BuisnessformPage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	data1: any;
	id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
  	this.postRequest();
  }
  postRequest() {
      	let id = this.navParams.get('id'); 
      	let data1 = JSON.stringify({id});
      	console.log(data1);
      	let link = 'http://207.180.229.30/service/buisnessform_api.php';
      	this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
        	this.user_data = [];
          	if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
	          	for(var i=0; i<data.user_datas.length;i++){
	              	this.user_data.push(data.user_datas[i]);
	          	}
          	}
          	console.log(this.user_data);
      	}, error => {
         	alert(error.message);
      	})	
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuisnessformPage');
  }
  ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('BuisnessderictoryPage');
	    }, 100)
	}

	back() {
	  	this.navCtrl.push('BuisnessderictoryPage');
	}

}
