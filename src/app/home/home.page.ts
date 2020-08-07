import { Component } from "@angular/core";
import { WebIntent } from "@ionic-native/web-intent/ngx";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  Headerm: any;
  SubHeaderm: any;

  constructor(private webIntent: WebIntent, private alertCtrl: AlertController) {}

  upi() {
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: "upi://pay?pa=shraone@upi&am=100&pn=ShravanDevade&tid=transactionid&cu=INR&tn=Note",
      // type: "application/vnd.android.package-archive",
    }

    this.webIntent.startActivityForResult(options).then(
      onSuccess => {
        if (onSuccess.extras.Status == 'SUCCESS') {
          this.Headerm = 'Success',
          this.SubHeaderm = 'Congratulations !\nPayment Done Successfull';
          console.log('Success', onSuccess);
          this.presentSuccessAlert(this.Headerm, this.SubHeaderm);
        }
        else if (onSuccess.extras.Status == 'SUBMITTED') {  
          this.Headerm = 'Payment Submitted',
          this.SubHeaderm = 'Your Payment is Submitted.\n We Will Contact You When Payment is Done.';
          console.log('Submitted', onSuccess);
          this.presentSuccessAlert(this.Headerm, this.SubHeaderm);
        }
        else if (onSuccess.extras.Status == 'Failed' || onSuccess.extras.Status == 'FAILURE') {
          this.Headerm = 'Error',
          this.SubHeaderm = 'Something Went Wrong..! Try again.';
          console.log('Failed', onSuccess);
          this.presentSuccessAlert(this.Headerm, this.SubHeaderm);
        }
      },
      onError => {
        console.log('Error', onError);
        // this.presentErrorAlert();
      });
  }

  async presentSuccessAlert(Headerm, SubHeaderm) {
    let alert = await this.alertCtrl.create({
      header: Headerm,
      subHeader: SubHeaderm,
      buttons: ['Okay']
    });
    alert.present();
  }
}
