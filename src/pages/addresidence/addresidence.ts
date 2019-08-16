import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,LoadingController,ToastController,Platform, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-addresidence',
  templateUrl: 'addresidence.html',
})
export class AddresidencePage {
	public unregisterBackButtonAction: any;
	@ViewChild('map') mapElement: ElementRef;
    map: any;
	slideRegisterForm: FormGroup;
    failure_flag: boolean = false;
    exist_flag: boolean = false;
    address1: any;
    address2: any;
    address3:any;
    city:any;
    state:any;
    postalcode:any;
    country:any;
    email:any;
  	constructor(public navCtrl: NavController,private viewCtrl: ViewController, public platform: Platform,public toastCtrl: ToastController,public formBuilder: FormBuilder,public http: Http,public loadingCtrl: LoadingController) {    
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad AddresidencePage');
  	}
  	public save() {
        let loadingPopup = this.loadingCtrl.create({
                content: 'Saving data...'
        });
        loadingPopup.present();
        this.failure_flag = false;
        this.exist_flag = false;
        let address1 = this.address1;
        let address2 = this.address2;
        let address3 = this.address3;
        let city = this.city
        let state = this.state;
        let postalcode = this.postalcode;
        let country = this.country;
        let email = this.email;
        let mobile_new = window.localStorage.getItem('mobile_new');
        let data1 = JSON.stringify({mobile_new,address1,address2,address3,city,state,postalcode,country,email});
        let link = 'http://207.180.229.30/service/addresidence_api.php'    
        let headers = {
            'Content-Type': 'application/json'
        };
        console.log(data1);
        this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
        if(data.success == 1){
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
        toast.onDidDismiss(() => {
            this.navCtrl.push('AddresidencePage');
        });
        toast.present();
    }
    presentToastSuccess(loadingPopup) {
        loadingPopup.dismiss().catch(() => {});
        let toast = this.toastCtrl.create({
            message: 'Success: Appointment Added Successfully',
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'

        });
        toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
            this.navCtrl.push('AddqualificationPage');
        });
        toast.present();
    }
    ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('AddmemberPage');
	    }, 100)
	}
	back(){
		this.navCtrl.push('AddmemberPage');
	}

}
