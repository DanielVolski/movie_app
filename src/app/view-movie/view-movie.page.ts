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
  releaseDate!: Date;
  genres: string[] = [];
  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.movie = history.state.movie;
    this.title = this.movie.title;
    this.director = this.movie.director;
    this.writer = this.movie.writer;
    this.releaseDate = this.movie.releaseDate;
    this.genres = this.movie.genres;
    console.log(this.movie.releaseDate.getUTCFullYear);
  }

  edit() {
    if (this.title && this.director && this.writer && this.genres.length > 0) {
      let releaseDate = new Date(this.releaseDate);
      let updated: Movie = new Movie(this.title, this.director, this.writer, releaseDate, this.genres)
      this.firebase.update(updated, this.movie.id);
      this.router.navigate(["/home"]);
    } else {
      this.presentAlert("Error", "Empty fields", "All the fields needs to be filled!", ["OK"]);
    }
    this.presentAlert("Sucess", "The movie has been updated", "OK", ["OK"]);
    this.router.navigate(["/home"]);
  }

  delete() {
    this.presentAlert(
      "Warning", 
      "You are deleting data", 
      "Are you sure you want to delete this movie?",
      [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => { 
            this.firebase.delete(this.movie.id);
            this.router.navigate(["/home"]);
          },
        }
      ],
    );
  }

  private async presentAlert(header: string, subHeader: string, message: string, buttons: any[]) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }

  backToHome() {
    this.router.navigate(["/home"])
  }
}
