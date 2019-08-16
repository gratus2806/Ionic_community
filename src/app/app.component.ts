import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

export interface PageInterface {
    title: string;
    pageName: string;
    tabComponent?: any;
    index?: number;
    icon: string;
    color?:any;
   
}

@Component({
  templateUrl: 'app.html' 
  
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'HomePage';
  
    //pages: Array<{title: string, component: any}>;
    pages: PageInterface[] = [
        { title: 'Home', pageName: 'HomePage', tabComponent: 'HomePage', index: 0, icon: '',color:'light' },
        { title: 'Profile', pageName: 'ProfiledataPage', tabComponent: 'ProfiledataPage', index: 1, icon: '',color:'light' },
        { title: 'Birthday', pageName: 'BdayPage', tabComponent: 'BdayPage', index: 2, icon: '' ,color:'light'},
        { title: 'Member Search', pageName: 'MembersearchPage', tabComponent: 'MembersearchPage', index: 3, icon: '',color:'light' },
        { title: 'Add Member', pageName: 'AddmemberPage', tabComponent: 'AddmemberPage', index: 4, icon: '' ,color:'light'},
        { title: 'Buisness Directory', pageName: 'BuisnessderictoryPage', tabComponent: 'BuisnessderictoryPage', index: 5, icon: '',color:'light' },
    	  { title: 'Sponsers', pageName: 'SponsersPage', tabComponent: 'SponsersPage', index: 6, icon: '' ,color:'light'},
        { title: 'News', pageName: 'NewsPage', tabComponent: 'NewsPage', index: 7, icon: '',color:'light' },
        // { title: 'Login', pageName: 'LoginPage', tabComponent: 'LoginPage', index: 8, icon: '',color:'light' },

        { title: 'Logout', pageName: 'LogoutPage', tabComponent: 'LogoutPage', index: 8, icon: '',color:'light' }

    ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page: PageInterface) {
        let params = {};
        // The index is equal to the order of our tabs inside tabs.ts
        if (page.index) {
          params = { tabIndex: page.index };
        }
        // The active child nav is our Tabs Navigation
        if (this.nav.getActiveChildNav() && page.index != undefined) {
          this.nav.getActiveChildNav().select(page.index);
        } else {
          // Tabs are not active, so reset the root page 
          // In this case: moving to or from SpecialPage
          this.nav.setRoot(page.pageName, params);
        }
        this.nav.setRoot(page.pageName);
        page.color='danger';

        for (let p of this.pages) {
        
        if(p.title==page.title)
        {
          p.color='danger';
        }
        else
        {
          p.color='light';
        }
        
        }

        }
 
    isActive(page: PageInterface) {
        // Again the Tabs Navigation
        let childNav = this.nav.getActiveChildNav();
        if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
                return 'primary';
            }
            return;
        }
        // Fallback needed when there is no active childnav (tabs not active)
        if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
        }
        return;
    }
}

