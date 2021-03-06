import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredentialDTO } from '../../models/credential.dto';
import { AuthorizationService } from '../../services/authorization.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credential: CredentialDTO = {
    email: "",
    password: ""
  };

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController, 
    public authorizationService: AuthorizationService
  ) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.authorizationService.refreshToken()
        .subscribe(response => {
          this.authorizationService.successfullLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoryPage');
        },
        error => {});
  }

  login() {
    this.authorizationService.authorization(this.credential)
        .subscribe(response => {
          this.authorizationService.successfullLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoryPage');
        },
        error => {});
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
