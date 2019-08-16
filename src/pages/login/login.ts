import { Component,  ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController,LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    @ViewChild('map') mapElement: ElementRef;
    map: any;
	slideRegisterForm: FormGroup;
    failure_flag: boolean = false;
    exist_flag: boolean = false;
    fetchdata: any;
    mobile: any;
    user_datas:any;
    result:any;
    constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public http: Http,public loadingCtrl: LoadingController) {    
        
        if(this.isLoggedin()){
            this.statusRequest();
            
            
        }
    }
    ionViewDidLoad() {
            console.log('ionViewDidLoad LoginPage');
    }
    isLoggedin(){

        console.log(window.localStorage.getItem('currentuser'));
        //window.localStorage.removeItem('currentuser');
        if(window.localStorage.getItem('currentuser')){
            return true;
        }
    }
    statusRequest(){
        //console.log('u r in post');
        let id = window.localStorage.getItem('id');
        let data2 = JSON.stringify({ id });
        let link = 'http://207.180.229.30/service/updatestatus_api.php';
        this.http.post(link, data2).map(res => res.json()).subscribe(data=>{
            this.fetchdata =data;
            let user_datas = this.fetchdata.user_datas;
            console.log(data.status_compare);
            console.log(data.status);
            if(data.status_compare==1){
                    let currentuser = {
                        status:data.status
                    };
                    window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
                    window.localStorage.setItem('status', data.status);
                    this.navCtrl.setRoot('HomePage');
                    
            }else{
                console.log('id not got');
                 
            }
        }, error => {
            alert(error.message);
        })
    }
    public gotoValidate() {
        let loadingPopup = this.loadingCtrl.create({
                content: 'Saving data...'
        });
        loadingPopup.present();
        this.failure_flag = false;
        this.exist_flag = false;
        let mobile = this.mobile;    
        let data1 = JSON.stringify({ mobile});
        console.log(data1);
        let link = 'http://207.180.229.30/service/customer_registration.php'    
        let headers = {
            'Content-Type': 'application/json'
        };
        console.log(data1);
        this.http.post(link, data1).map(res => res.json()).subscribe(data=>{
            this.fetchdata = data;
            console.log(data);            
            let user_datas = this.fetchdata.user_datas; 
            
                let currentuser = {
                    mobile:data.mobile,  
                };
                this.failure_flag = false;
                this.exist_flag = false;
                this.navCtrl.push('ValidatePage');
                loadingPopup.dismiss().catch(() => {});
        },error => {
            this.failure_flag = true;
            this.exist_flag = false;
            loadingPopup.dismiss().catch(() => {});
        })
    }

}