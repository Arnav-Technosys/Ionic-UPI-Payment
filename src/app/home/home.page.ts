import { Component } from "@angular/core";
import { WebIntent } from "@ionic-native/web-intent/ngx";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {

  constructor(private webIntent: WebIntent, private alertCtrl: AlertController) {}

  upi() {
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: "upi://pay?pa=shraone@upi&am=100&pn=ShravanDevade&tid=transactionid&cu=INR&tn=Note",
      // type: "application/vnd.android.package-archive",
    }

    this.webIntent.startActivityForResult(options).then(
      onSuccess => {
        console.log('Success', onSuccess);
        this.presentSuccessAlert();
      },
      onError => {
        console.log('Error', onError);
        this.presentErrorAlert();
      });
  }

  async presentSuccessAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Success',
      subHeader: 'Payment Done Successfull',
      buttons: ['Okay']
    });
    alert.present();
  }



  async presentErrorAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Error',
      subHeader: 'Something Went Wrong..! Try again.',
      buttons: ['Okay']
    });
    alert.present();
  }
}
