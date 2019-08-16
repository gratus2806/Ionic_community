import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController,ToastController,LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe, DecimalPipe } from '@angular/common'
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-myfamilyform',
  templateUrl: 'myfamilyform.html',
})
export class MyfamilyformPage {
public unregisterBackButtonAction: any;
	public user_data: any = [];
	data1: any;
	id: any;
	failure_flag: boolean = false;
	exist_flag: boolean = false;
	data: any;
	fetchdata: any;
	mobile_no: any;
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
    city:any;
    email:any;
    completed:any;
    address1:any;
    address2:any;
    address3:any;
    kuldevta:any;
    todatype:any;
    village:any;
    finlaw:any;
    minlaw:any;
    inlawvillage:any;
    lahanu:any;
    sahyog:any;
    yuva:any;
    yuvak:any;
    buisness:any;
    bdetail:any;
    baddress1:any;
    baddress2:any;
    officeno:any;
    achievement:any;
    qualification:any;
	constructor(public navCtrl: NavController, public navParams: NavParams,public datepipe: DatePipe,public loadingCtrl: LoadingController,public toastCtrl: ToastController, public http: Http, public platform: Platform, private viewCtrl: ViewController) {
		this.postRequest();
	}

  postRequest() {
      	let id = this.navParams.get('id'); 
      	let data1 = JSON.stringify({id});
      	//console.log(data1);
      	let link = 'http://207.180.229.30/service/myfamilyform_api.php';
      	this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
        	this.user_data = [];
          	if(data.hasOwnProperty('user_datas') && data.user_datas.length > 0){
	          	for(var i=0; i<data.user_datas.length;i++){
                //       for(var i=0; i<data.user_datas.length;i++){
	              	// this.user_data.push(data.user_datas[i]);
                //   }
	              	this.fname= data.user_datas[i].fname;
	              	this.mname= data.user_datas[i].mname;
	              	this.lname= data.user_datas[i].lname;
	              	this.mobile_no= data.user_datas[i].mobile_no;
	              	this.city= data.user_datas[i].city;
	              	this.sextype= data.user_datas[i].sextype;
	              	this.maritaltype= data.user_datas[i].maritaltype;
	              	this.bloodgroup= data.user_datas[i].bloodgroup;
	              	 this.dob = this.datepipe.transform(data.user_datas[i].dob.date, 'yyyy.MM.dd');
                    this.mdob= this.datepipe.transform(data.user_datas[i].mdob.date, 'yyyy.MM.dd');
	              	this.email= data.user_datas[i].email;
	              	this.completed= data.user_datas[i].completed;
	              	this.address1= data.user_datas[i].address1;
	              	this.address2= data.user_datas[i].address2;
	              	this.address3= data.user_datas[i].address3;
	              	this.kuldevta= data.user_datas[i].kuldevta;
	              	this.todatype= data.user_datas[i].todatype;
	              	this.village= data.user_datas[i].village;
	              	this.finlaw= data.user_datas[i].finlaw;
	              	this.minlaw= data.user_datas[i].minlaw;
	              	this.inlawvillage= data.user_datas[i].inlawvillage;
	              	this.lahanu= data.user_datas[i].lahanu;
					this.sahyog= data.user_datas[i].sahyog;
					this.yuva= data.user_datas[i].yuva;
					this.yuvak= data.user_datas[i].yuvak;
					this.buisness= data.user_datas[i].buisness;
					this.bdetail= data.user_datas[i].bdetail;
					this.baddress1= data.user_datas[i].baddress1;
					this.baddress2= data.user_datas[i].baddress2;
					this.officeno= data.user_datas[i].officeno;
					this.achievement= data.user_datas[i].achievement;
                    this.photo_src= data.user_datas[i].photo_src;
					
					console.log(this.fname);
	          	} 
          	}
          	console.log(this.user_data);
      	}, error => {
         	//alert(error.message);
      	})	
  	}
  	public save() {
        let loadingPopup = this.loadingCtrl.create({
                content: 'Saving data...'
        });
        loadingPopup.present();
        this.failure_flag = false;
        this.exist_flag = false;
        let fname = this.fname;
        let mname = this.mname;
        let lname = this.lname;
        let mobile_no = this.mobile_no;
        let dob = this.dob;
        let city = this.city;
        let sextype = this.sextype;
        let maritaltype = this.maritaltype;
        let bloodgroup = this.bloodgroup;
        let mdob = this.mdob;
        let email = this.email;
        let completed = this.completed;
        let address1 = this.address1;
        let address2 = this.address2;
        let address3 = this.address3;
        let kuldevta = this.kuldevta;
        let todatype = this.todatype;
        let village = this.village;
        let finlaw = this.finlaw;
        let minlaw = this.minlaw;
        let inlawvillage = this.inlawvillage;
        let lahanu = this.lahanu;
        let sahyog = this.sahyog;
        let yuva = this.yuva;
        let yuvak = this.yuvak;
        let buisness = this.buisness;
        let bdetail = this.bdetail;
        let baddress1 = this.baddress1;
        let baddress2 = this.baddress2;
        let officeno = this.officeno;
        let achievement = this.achievement;
        
        let data = JSON.stringify({village,finlaw,minlaw,baddress1,baddress2,officeno,achievement,lahanu,sahyog,yuva,yuvak,buisness,bdetail,fname,inlawvillage,mname,lname, mobile_no,dob,city,sextype,maritaltype,bloodgroup,mdob,email,completed,address1,address2,address3,kuldevta,todatype});
        let link = 'http://207.180.229.30/service/myfamilyupdate_api.php'    
        let headers = {
            'Content-Type': 'application/json'
        };
        this.http.post(link, data).map(res => res.json()).subscribe(data=>{
        	this.fetchdata = data;
            console.log(data);            
            let user_datas = this.fetchdata.user_datas;
            if(data.success==1) {
                
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
        //     this.navCtrl.push('MyfamilyformPage');
        // });
        toast.present();
    }
    presentToastSuccess(loadingPopup) {
        loadingPopup.dismiss().catch(() => {});
        let toast = this.toastCtrl.create({
            message: 'Success:  updated Successfully ',
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top'

        });
        // toast.onDidDismiss(() => {
        //     //console.log('Dismissed toast');
        //     this.navCtrl.push('HomePage');
        // });
        toast.present();
    }

	ionViewDidLoad() {
	    console.log('ionViewDidLoad MyfamilyformPage');
	}

	ionViewWillEnter() {
	    this.viewCtrl.showBackButton(false);
	    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	    	this.navCtrl.push('MyfamilyPage');
	    }, 100)
	}

	// back() {
	//   	this.navCtrl.push('MyfamilyPage');
	// }
}
