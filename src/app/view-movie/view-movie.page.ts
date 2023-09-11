import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/entities/Movie';
import { Router } from '@angular/router';
import { FirebaseService } from '../model/services/firebase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.page.html',
  styleUrls: ['./view-movie.page.scss'],
})
export class ViewMoviePage implements OnInit {
  movie!: Movie;
  title!: string;
  director!: string;
  writer!: string;
  releaseDate!: string;
  genres: string[] = [];
  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  edit() {
    if (this.title && this.director && this.writer && this.genres.length > 0) {
      let releaseDate = new Date(this.releaseDate);
      let updated: Movie = new Movie(this.title, this.director, this.writer, releaseDate, this.genres)
      this.firebase.update(updated, this.movie.id);
      this.router.navigate(["/home"]);
    } else {
      this.presentAlert("Error", "Empty fields", "All the fields needs to be filled!");
    }
  }

  delete() {
    this.firebase.delete(this.movie.id);
    this.router.navigate(["/home"]);
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
}