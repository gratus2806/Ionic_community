import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,Platform,ToastController,ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from '@angular/http';
@IonicPage()
@Component({
  	selector: 'page-validate',
 	templateUrl: 'validate.html'
})
export class ValidatePage {
	public unregisterBackButtonAction: any;
	slideLoginForm: FormGroup;
	password: any;
	data: any;
	fetchdata: any;	
  	constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public platform: Platform,private viewCtrl: ViewController,public navParams: NavParams,public toastCtrl: ToastController,private http: Http,public loadingCtrl: LoadingController) {	
  	
  	}
 //  	ionViewWillEnter() {
	//     this.viewCtrl.showBackButton(false);
	//     this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	//     	this.navCtrl.push('LoginPage');
	//     }, 100)
	// }
	 // isLoggedin(){
  //       console.log(window.localStorage.getItem('currentuser'));
  //       //window.localStorage.removeItem('currentuser');
  //       if(window.localStorage.getItem('currentuser')){
  //           return true;
  //       }
  //   }

  	public gotoHome(){
  		let loadingPopup = this.loadingCtrl.create({
          content: 'Authenticating data...'
        });
    	loadingPopup.present();
  		let password = this.password;
  		let data = JSON.stringify({ password});
  		console.log(data);
  		let link = 'http://207.180.229.30/service/community_validation.php'
  		this.http.post(link, data).map(res => res.json()).subscribe(data=>{
  			
	        this.fetchdata =data;
	        let user_datass = this.fetchdata.user_datass;
	        //console.log(data.id);
	        if(data.status_compare == '1'){
	        	console.log(data.status_compare);
	    		let currentuser = {
	    			id:data.id,
	            	mobile:data.mobile_no,
	  	  			password: data.password,
	  	  			status:data.status

	  	  		};
	  	  		console.log(currentuser);
	          	window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
	          	window.localStorage.setItem('id', data.id);
	          	window.localStorage.setItem('mobile', data.mobile_no);
	  	  		window.localStorage.setItem('password', data.password);
	  	  		window.localStorage.setItem('status', data.status);
	  	  		let pgs = window.localStorage.getItem('pgs');
	  			 this.navCtrl.push(pgs);
	          	loadingPopup.dismiss().catch(() => {})
	        } else {
	          	loadingPopup.dismiss().catch(() => {});
	        	this.presentToastFailure1();
	        }
  		}, error => {
  			loadingPopup.dismiss().catch(() => {});
  			this.presentToastFailure();
  		})	
	}
	presentToastFailure() {
	    let toast = this.toastCtrl.create({
	    	message: 'Warning: Please try again after some time or check your Internet Connection',
	    	duration: 3000,	
	    	showCloseButton: true,
	  		closeButtonText: 'Ok',
	  		position: 'top'
	    });
	    toast.onDidDismiss(() => {
			this.navCtrl.push('LoginPage');
		});
	    toast.present();
	}

	presentToastFailure1() {
	    let toast = this.toastCtrl.create({
	    	message: ' Password is invalid',
	    	duration: 3000,	
	    	showCloseButton: true,
	  		closeButtonText: 'Ok',
	  		position: 'top'
	    });
	    toast.onDidDismiss(() => {
			this.navCtrl.push('ValidatePage');
		});
	    toast.present();
	}
	// goBack(){
	// 	this.navCtrl.push('LoginPage');
	// }


}