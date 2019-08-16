import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,ToastController, ViewController,LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common'
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html',
    
})
export class ProfilePage {
	public unregisterBackButtonAction: any;
	public user_data: any = [];
	
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	data: any;
	id: any;
	fetchdata: any;
	mobile: any;
    mdob:any;
    maritaltype:any;
    sextype:any;
    relation:any;
    dob:any;
    gfather:any;
    mother:any;
    sonname:any;
    husbandname:any;
    mname:any;
    lname:any;
    fname:any;
    title:any;
    user_datas:any;
    result:any;
    father:any;
    bloodgroup:any;
    photo_src:any;
    date:any;
	constructor(public navCtrl: NavController,public toastCtrl: ToastController,public datepipe: DatePipe,public loadingCtrl: LoadingController, public navParams: NavParams, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		let status = window.localStorage.getItem('status');
        console.log(status);
        if(status =='1'){
            this.postRequest();
        } else {
            window.localStorage.setItem('pgs', 'ProfiledataPage');
            this.navCtrl.push('LoginPage');
        }
	}
	
	postRequest() {
		let id = window.localStorage.getItem('id');
		let data = JSON.stringify({id});
		let link = 'http://207.180.229.30/service/profile_api.php';
		this.http.post(link, data).map(res => res.json()).subscribe(data=>{
			this.user_data = [];
			if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
				for(var i=0; i<data.user_datas.length;i++){
					
                    this.photo_src= data.user_datas[i].photo_src;
                    this.title= data.user_datas[i].title;
                    this.fname= data.user_datas[i].fname;
                    this.father= data.user_datas[i].father;
                    this.lname= data.user_datas[i].lname;
                    this.mother= data.user_datas[i].mother;
                    this.gfather= data.user_datas[i].gfather;
                    this.dob = this.datepipe.transform(data.user_datas[i].dob.date, 'yyyy.MM.dd');
                    this.mdob= this.datepipe.transform(data.user_datas[i].mdob.date, 'yyyy.MM.dd');
                    this.relation= data.user_datas[i].relation;
                    this.sextype= data.user_datas[i].sextype;
                    this.maritaltype= data.user_datas[i].maritaltype;
                    this.bloodgroup= data.user_datas[i].bloodgroup;
                    this.mobile= data.user_datas[i].mobile;
				}
			}
		}, error => {
			alert(error.message);
		})
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ProfilePage');
	}
	public save() {
        let loadingPopup = this.loadingCtrl.create({
                content: 'Saving data...'
        });
        loadingPopup.present();
        this.failure_flag = false;
        this.exist_flag = false;
        let title = this.title;
        let fname = this.fname;
        //let mname = this.mname;
        let lname = this.lname;
        let father = this.father;
        //let husbandname = this.husbandname;
        //let sonname = this.sonname;
        let mother = this.mother;
        let gfather = this.gfather;
        let dob = this.dob;
        let mdob = this.mdob;
        let relation = this.relation;
        let sextype = this.sextype;
        let maritaltype= this.maritaltype;
        let bloodgroup= this.bloodgroup;
        let mobile = this.mobile;   
        let data1 = JSON.stringify({ title,fname,lname,mother,gfather,father,dob,relation,maritaltype,sextype,mdob,mobile,bloodgroup});
        let link = 'http://207.180.229.30/service/profileupdate_api.php'    
        let headers = {
            'Content-Type': 'application/json'
        };
        //console.log(data1);
        this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
        this.fetchdata = data;
            console.log(data);            
            let user_datas = this.fetchdata.user_datas;
            if(data.success==1) {
                let currentuser = {
                    mobile_new:data.mobile_new,  
                };
                console.log(data.mobile_new);
                window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
                window.localStorage.setItem('mobile_new', data.mobile_new);
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
        //     this.navCtrl.push('ProfilePage');
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
        //     //this.navCtrl.push('ProfilePage');
        // });
        toast.present();
    }
	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('HomePage');
		}, 100)
	}
	back() {
		this.navCtrl.push('HomePage');
	}
}