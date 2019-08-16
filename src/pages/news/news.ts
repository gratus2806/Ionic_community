import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  public unregisterBackButtonAction: any;
	user_id: any;
	public news_datas: any = [];
	constructor(public navCtrl: NavController, public navParams: NavParams,  public platform: Platform, public loadingCtrl: LoadingController, private http: Http, private alertCtrl: AlertController, public toastCtrl: ToastController, private viewCtrl: ViewController) {
		// if(!this.isLoggedin()){
		// 	console.log('No Logged in');
		// 	this.navCtrl.push('LoginPage');
		// }
		this.data();
	}

	// isLoggedin(){
	// 	if(window.localStorage.getItem('currentuser')){
	// 		return true;
	// 	}	
	// }

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewsPage');
	}

	ionViewWillEnter() {
  		this.viewCtrl.showBackButton(false);
	  	this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	  		this.navCtrl.push('HomePage');
	  	}, 100)
	}

	goBack(){
		this.navCtrl.push('HomePage');
	}
	data() {
		let status = window.localStorage.getItem('status');
		if(status=='1'){
			let loadingPopup = this.loadingCtrl.create({
			  content: 'Loading data...'
			});
			loadingPopup.present();
			// let id = window.localStorage.getItem('id');
			// let data = JSON.stringify({id});
			let  data = '';
			let link = 'http://207.180.229.30/chanasma/service/news_list_api.php';
			this.http.post(link, data).map(res => res.json()).subscribe(data=>{
				this.news_datas = [];
				if(data.exist_status == 1){
					if(data.hasOwnProperty('news_datas') && data.news_datas.length > 0){
					for(var i=0; i<data.news_datas.length;i++){
		                    this.news_datas.push(data.news_datas[i]);
		                    console.log(data.news_datas[i]);
						}
					}
					loadingPopup.dismiss().catch(() => {});
				}
				
			}, error => {
				loadingPopup.dismiss().catch(() => {});
				this.news_datas = [];
				if(JSON.parse(window.localStorage.getItem('news_datas'))){
					this.news_datas = JSON.parse(window.localStorage.getItem('news_datas'));
					console.log(this.news_datas);
				}
			})
		} else {
			window.localStorage.setItem('pgs', 'NewsPage');
	    	this.navCtrl.push('LoginPage');
	    }
	}

	

	more(news_id, counter){
		this.navCtrl.push('NewsdescPage', {
			news_id: news_id,
			counter: counter
		})
	}

	// presentToast(message) {
	// 	let toast = this.toastCtrl.create({
	// 		message: message,
	// 		duration: 3000,	
	// 		showCloseButton: true,
	// 		closeButtonText: 'Ok',
	// 		position: 'top'
	// 	});
	// 	toast.onDidDismiss(() => {
	// 		this.navCtrl.push('NewsPage');
	// 	});
	// 	toast.present();
	// }
}
