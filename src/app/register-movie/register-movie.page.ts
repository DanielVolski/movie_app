import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../model/services/firebase.service';
import { Movie } from '../model/entities/Movie';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register-movie',
  templateUrl: './register-movie.page.html',
  styleUrls: ['./register-movie.page.scss'],
})
export class RegisterMoviePage implements OnInit {
  movie!: Movie;
  title!: string;
  director!: string;
  writer!: string;
  releaseDate!: string;
  genres: string[] = [];
  public image: any;

  constructor(private router: Router, private firebase: FirebaseService, private alertController: AlertController) { }

  uploadFile(image: any) {
    this.image = image.files;
  }

  create() {
    if (this.title && this.director && this.writer && this.genres.length > 0) {
      this.firebase.create(new Movie(this.title, this.director, this.writer, this.releaseDate, this.genres));
      this.router.navigate(["/home"]);
    } else {
      this.presentAlert("Error", "Empty fields", "All the fields needs to be filled!");
    }
  }


  private async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }


  ngOnInit() {
  }

}
