import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,LoadingController,ToastController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-buisnessaddress',
  templateUrl: 'buisnessaddress.html',
})
export class BuisnessaddressPage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	data: any;
	id: any;
	buisness:any;
	bcategory:any;
	bdetail:any;
	baddress1:any;
	baddress2:any;
	bcity:any;
	bstate:any;
	bpostal:any;
	bcountry:any;
	officeno:any;
  	constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
  	this.postRequest();
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
                    this.buisness= data.user_datas[i].buisness;
                    this.bcategory= data.user_datas[i].bcategory;
                    this.bdetail= data.user_datas[i].bdetail;
                    this.baddress1= data.user_datas[i].baddress1;
                    this.baddress2= data.user_datas[i].baddress2;
                    this.bcity= data.user_datas[i].bcity;
                    this.bstate= data.user_datas[i].bstate;
                    this.bpostal= data.user_datas[i].bpostal;
                    this.bcountry= data.user_datas[i].bcountry;
                    this.officeno= data.user_datas[i].officeno;
				}
			}
			console.log(this.user_data);
		}, error => {
			alert(error.message);
		})
	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad BuisnessaddressPage');
  	}
  	ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('HomePage');
	    }, 100)
	}
	save(){
		let loadingPopup = this.loadingCtrl.create({
                content: 'Saving data...'
        });
        loadingPopup.present();
        this.failure_flag = false;
        this.exist_flag = false;
        let buisness = this.buisness;
        let bcategory = this.bcategory;
        let bdetail = this.bdetail;
        let baddress1= this.baddress1
        let baddress2 = this.baddress2;
        let bcity = this.bcity;
        let bstate = this.bstate;
        let bpostal= this.bpostal;
        let bcountry=this.bcountry;
        let officeno=this.officeno;
        let mobile_new = window.localStorage.getItem('mobile_new');
        let data1 = JSON.stringify({mobile_new,buisness,bcategory,bdetail,baddress1,baddress2,bcity,bstate,bpostal,bcountry,officeno});
        let link = 'http://207.180.229.30/service/addbuisnessaddress_api.php'    
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
        //     this.navCtrl.push('ResidencePage');
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
        //     //console.log('Dismissed toast');
        //     this.navCtrl.push('OtherdetailPage');
        // });
        toast.present();
    }
	

	back() {
	  	this.navCtrl.push('HomePage');
	}

}
