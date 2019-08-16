import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, Platform,AlertController } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
	public unregisterBackButtonAction: any;
	fetchdata:any;
  	constructor(public navCtrl: NavController,public http: Http, private viewCtrl: ViewController,private alertCtrl: AlertController, public platform: Platform, public navParams: NavParams) {
  	}
  	
  	home(){
	    
	    let id = window.localStorage.getItem('id');
	    let data2 = JSON.stringify({ id });
	    let link = 'http://207.180.229.30/service/updatestatus_api.php';
	    this.http.post(link, data2).map(res => res.json()).subscribe(data=>{	
        	this.fetchdata =data;
            let user_datas = this.fetchdata.user_datas;
            let currentuser = {
                status:data.status
            };
            console.log(data.status);
            window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
            window.localStorage.setItem('status', data.status);
            this.navCtrl.setRoot('HomePage');
        }, error => {
            alert(error.message);
        })	
  	}
  
	Data = [{ image: "http://chanasma.org/slides/1.jpg"}, {image: "http://chanasma.org/slides/2.jpg"}, {image: "http://chanasma.org/slides/3.jpg" }, { image: "http://chanasma.org/slides/4.jpg"}, {image: "http://chanasma.org/slides/5.jpg"}, {image: "http://chanasma.org/slides/6.jpg" }]
	DLength: boolean = false;

	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.exit();
		}, 100)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad HomePage');
	}
	exitApp(){
		this.platform.exitApp();
  	}
	exit(){
	  	let alert = this.alertCtrl.create({
			title: 'Confirm',
			message: 'Do you want to Exit?',
			buttons: [{
		  		text: "Yes",
		  		handler: () => { 
					this.exitApp() 
		  		}
				}, {
		  		text: "No",
		  		role: 'cancel'
			}]
	  	})
	  	alert.present();
	}

	/*goBack(){
		this.navCtrl.push('HomePage');
	}*/

}
