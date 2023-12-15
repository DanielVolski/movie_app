import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController, private loadingController: LoadingController) { }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Movies',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  simpleLoaderController() {
    this.loadingController.create({
      message: 'Carregando...'
    }).then((response) => {
      response.present();
    })
  }

  dismissLoaderController() {
    this.loadingController.dismiss().then((response) =>
      console.log('Loader fechado!', response)
    );
  }
}
