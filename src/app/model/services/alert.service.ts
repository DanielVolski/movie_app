import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private alertController: AlertController, 
    private loadingController: LoadingController,
    private router: Router,
    private firebase: FirebaseService
  ) { }

  async presentAlert(subHeader : string, message : string) {
    const alert = await this.alertController.create({
      header: 'Movies',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async deleteMovieAlert(id: string) {
    const alert = await this.alertController.create({
      header: 'Warning!',
      subHeader: 'You are deleting a movie!',
      message: 'Are you sure you want to delete this movie?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.firebase.delete(id);
            this.router.navigate(['/home']);
          },
        },
      ]
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
