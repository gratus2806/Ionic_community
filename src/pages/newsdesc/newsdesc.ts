import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { Http } from '@angular/http';
//import { ScreenOrientation } from '@ionic-native/screen-orientation'
// import { ImageViewerController } from 'ionic-img-viewer';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-newsdesc',
  templateUrl: 'newsdesc.html',
})
export class NewsdescPage {
// _imageViewerCtrl: ImageViewerController;
	public unregisterBackButtonAction: any;
	news_id: any;
	news_title: any;
	news_date: any;
	news_image: any;
	data: any;
	user_id: any;
	link: any;
	counter: any;
	news_discription:any;
	public news_datas: any = [];
 constructor(public navCtrl: NavController, public navParams: NavParams,  public platform: Platform, public loadingCtrl: LoadingController, private http: Http, private alertCtrl: AlertController, public toastCtrl: ToastController, private viewCtrl: ViewController) {
		if(!this.isLoggedin()){
			console.log('No Logged in');
			this.navCtrl.push('LoginPage');
	  	}
	 //  	platform.ready().then(() => {
		// 	if (platform.is('cordova')){
		//   		// this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
		// 	}
		// });
		this.load_data();
		// this._imageViewerCtrl = imageViewerCtrl;
	}
	isLoggedin(){
		if(window.localStorage.getItem('currentuser')){
	  		return true;
		}	
  	}

	ionViewDidLoad() {
    	console.log('ionViewDidLoad NewsdescPage');
  	}

	ionViewWillEnter() {
  		this.viewCtrl.showBackButton(false);
	  	this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
	  		//this.navCtrl.push('NewsPage');
	  		this.navCtrl.pop();
	  	}, 100)
	}

	goBack(news_id){
		//this.navCtrl.push('NewsPage');
		this.navCtrl.pop();
	}

	load_data(){
		let loadingPopup = this.loadingCtrl.create({
	      content: 'Loading data...'
	    });
  		loadingPopup.present();
  		let news_id = this.navParams.get('news_id'); 
  		let counter = this.navParams.get('counter'); 
  		let user_id = window.localStorage.getItem('user_id');
		let data = JSON.stringify({user_id, news_id});
     	let link = 'http://207.180.229.30/chanasma/service/news_api.php';
  		this.http.post(link, data).map(res => res.json()).subscribe(data=>{
	  		if(data.news_datas.exist_status == 1){
		  		this.news_id = data.news_datas.news_id;
		  		this.news_title = data.news_datas.news_title;
		  		this.news_date = data.news_datas.news_date;
		  		this.news_discription =  data.news_datas.news_discription;
		  		this.news_image = data.news_datas.news_image;
		  	}
	        loadingPopup.dismiss().catch(() => {});
	    }, error => {
  			loadingPopup.dismiss().catch(() => {});
  			this.news_datas = [];
	        if(JSON.parse(window.localStorage.getItem('news_datas'))){
				this.news_datas = JSON.parse(window.localStorage.getItem('news_datas'));
				this.news_id = this.news_datas[counter].news_id;
		  		this.news_title = this.news_datas[counter].news_title;
		  		this.news_date = this.news_datas[counter].news_date;
		  		this.news_discription = this.news_datas[counter].news_discription;
		  		this.news_image = this.news_datas[counter].news_image;
			} else {
				this.presentToast('Warning: Please try again after some time or check your Internet Connection');
			}
  		})
  	}

  	presentToast(message) {
	    let toast = this.toastCtrl.create({
	    	message: message,
	    	duration: 3000,	
	    	showCloseButton: true,
	  		closeButtonText: 'Ok',
	  		position: 'top'
	    });
	    toast.onDidDismiss(() => {
			this.navCtrl.push('HomePage');
		});
	    toast.present();
	}

	// presentImage(myImage){
	// 	// const imageViewer = this._imageViewerCtrl.create(myImage);
    // 	imageViewer.present();	

    // 	setTimeout(() => imageViewer.dismiss(), 1000);
    // 	imageViewer.onDidDismiss(() => alert('Viewer dismissed'));
	// }
}

  


