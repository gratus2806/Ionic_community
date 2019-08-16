import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the IndexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {
	public unregisterBackButtonAction: any;
  	constructor(public navCtrl: NavController, private viewCtrl: ViewController, public platform: Platform, public navParams: NavParams) {
  	}

  
	Data = [{ image: "http://chanasma.org/slides/1.jpg"}, {image: "http://chanasma.org/slides/2.jpg"}, {image: "http://chanasma.org/slides/3.jpg" }, { image: "http://chanasma.org/slides/4.jpg"}, {image: "http://chanasma.org/slides/5.jpg"}, {image: "http://chanasma.org/slides/6.jpg" }]
	DLength: boolean = false;

	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('HomePage');
		}, 100)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad IndexPage');
	}

	goBack(){
		this.navCtrl.push('HomePage');
	}

}
