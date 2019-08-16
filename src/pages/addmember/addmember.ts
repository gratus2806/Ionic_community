import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,LoadingController,ToastController,Platform, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-addmember',
  templateUrl: 'addmember.html',
})
export class AddmemberPage {
    public unregisterBackButtonAction: any;
	@ViewChild('map') mapElement: ElementRef;
    map: any;
    public user_data: any = [];
	slideRegisterForm: FormGroup;
    failure_flag: boolean = false;
    exist_flag: boolean = false;
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
    f_name:any;
    h_name:any;
    s_name:any;
    title:any;
    user_datas:any;
    result:any;
    father:any;
    bloodgroup:any;
  	constructor(public navCtrl: NavController,private viewCtrl: ViewController, public platform: Platform,public toastCtrl: ToastController,public formBuilder: FormBuilder,public http: Http,public loadingCtrl: LoadingController) {    
        let status = window.localStorage.getItem('status');
        if(status =='1'){
            this.postRequest();
        } else {
            this.navCtrl.push('LoginPage');
        }
    }
    postRequest() {
        let id = window.localStorage.getItem('id');
        let data = JSON.stringify({id});
        console.log(data);
        let link = 'http://207.180.229.30/service/profile_api.php';
        this.http.post(link, data).map(res => res.json()).subscribe(data=>{
            this.user_data = [];
             console.log(this.user_data);
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

  	

  	public save() {
        let loadingPopup = this.loadingCtrl.create({
                content: 'Saving data...'
        });
        loadingPopup.present();
        this.failure_flag = false;
        this.exist_flag = false;
        let id = window.localStorage.getItem('id');
        let title = this.title;
        let fname = this.fname;
        let mname = this.mname;
        let lname = this.lname;
        //let father = this.father;
        // let husbandname = this.husbandname;
        // let sonname = this.sonname;
        let mother = this.mother;
        let gfather = this.gfather;
        let dob = this.dob;
        let mdob = this.mdob;
        let f_name = this.f_name;
        let h_name = this.h_name;
        let s_name = this.s_name;
        let mobile = this.mobile; 
        let relation = this.relation;
        let sextype= this.sextype;
        let maritaltype=this.maritaltype; 
        let bloodgroup = this.bloodgroup; 
        let data1 = JSON.stringify({id, title,sextype,relation,s_name,h_name,f_name,maritaltype,fname,mname,lname,mother,gfather,dob,mdob,mobile,bloodgroup});
        let link = 'http://207.180.229.30/service/addmember_api.php'    
        let headers = {
            'Content-Type': 'application/json'
        };
        console.log('data1');
        console.log(data1);
        this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
        this.fetchdata = data;
        console.log('data');
        console.log(data);            
        let user_datas = this.fetchdata.user_datas;
        console.log('data.success');
        console.log(data.success);
        if(data.success == 1){
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
        toast.onDidDismiss(() => {
            this.navCtrl.push('AddresidencePage');
        });
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
        toast.onDidDismiss(() => {
            //console.log('Dismissed toast');
            this.navCtrl.push('AddresidencePage');
        });
        toast.present();
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddmemberPage');
     }
    ionViewWillEnter() {
        this.viewCtrl.showBackButton(false);
        this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
            this.navCtrl.push('HomePage');
        }, 100)
    }
    back(){
        this.navCtrl.push('HomePage');
    }


}
