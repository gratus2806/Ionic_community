import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.postRequest();
  }
  postRequest(){

        console.log(window.localStorage.getItem('currentuser'));
        window.localStorage.removeItem('currentuser');
	  	window.localStorage.removeItem('status');
	  	window.localStorage.removeItem('mobile_new');
	  	this.navCtrl.push('LoginPage');	
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
