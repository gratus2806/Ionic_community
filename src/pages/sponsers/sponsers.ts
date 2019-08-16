import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, Platform } from 'ionic-angular';

/**
 * Generated class for the SponsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sponsers',
  templateUrl: 'sponsers.html',
})
export class SponsersPage {
	public unregisterBackButtonAction: any;

	constructor(public navCtrl: NavController, private viewCtrl: ViewController, public platform: Platform, public navParams: NavParams) {
	}

	Data = [{ image: "http://chanasma.org/slides/1.jpg"}, {image: "http://chanasma.org/slides/2.jpg"}, {image: "http://chanasma.org/slides/3.jpg" }, { image: "http://chanasma.org/slides/4.jpg"}, {image: "http://chanasma.org/slides/5.jpg"}, {image: "http://chanasma.org/slides/6.jpg" }]
	DLength: boolean = false;

	Pic = [{ image: "assets/imgs/f1.jpg", img: "assets/imgs/f2.jpg", i: "assets/imgs/f3.jpg" },{ image: "assets/imgs/f4.jpg", img: "assets/imgs/f5.jpg", i: "assets/imgs/f6.jpg" }]
	PLength: boolean = false;

	ionViewWillEnter() {
		this.viewCtrl.showBackButton(false);
		this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
			this.navCtrl.push('HomePage');
		}, 100)
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad SponsersPage');
	}

	goBack(){
		this.navCtrl.push('HomePage');
	}

}
