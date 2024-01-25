import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/entities/Movie';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.page.html',
  styleUrls: ['./view-movie.page.scss'],
})
export class ViewMoviePage implements OnInit {
  formMovie: FormGroup;
  movie!: Movie;
  title!: string;
  director!: string;
  writer!: string;
  releaseDate!: string;
  genres: string[] = [];
  public poster: any;
  public user: any;
  public canEdit: boolean = false;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alertController: AlertController,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.formMovie = new FormGroup({
      title: new FormControl(''),
      director: new FormControl(''),
      writer: new FormControl(''),
      releaseDate: new FormControl(''),
      genres: new FormArray([]),
      uid: new FormControl(''),
    });
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.movie = history.state.movie;
    this.title = this.movie.title;
    this.director = this.movie.director;
    this.writer = this.movie.writer;
    this.releaseDate = this.movie.releaseDate;
    this.genres = this.movie.genres;
    this.formMovie = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      director: [this.director, [Validators.required]],
      writer: [this.writer, [Validators.required]],
      releaseDate: [this.releaseDate, [Validators.required]],
      genres: [this.genres, [Validators.required]]
    });
  }

  toggleEdit() {
    this.canEdit = !this.canEdit;
  }

  uploadFile(image: any) {
    this.poster = image.files;
  }

  submitForm() {
    if (!this.formMovie.valid) return false;
    this.edit();
    return true;
  }

  edit() {
      let updated: Movie = new Movie(
        this.title,
        this.director,
        this.writer,
        this.releaseDate,
        this.genres,
        this.user.uid
      );
      this.movie = history.state.movie;
      updated.id = this.movie.id;
      if (this.poster) {
        this.firebase.uploadMovie(this.poster, updated);
      } else {
        updated.downloadURL = this.movie.downloadURL;
        this.firebase.uploadMovie(null, updated);
      }
      this.presentAlert('Sucess', 'The movie has been updated', '', ['OK']);
      this.router.navigate(['/home']);
      this.movie = history.state.movie;
      this.title = this.movie.title;
      this.director = this.movie.director;
      this.writer = this.movie.writer;
      this.releaseDate = this.movie.releaseDate;
      this.genres = this.movie.genres;
  }

  delete() {
    this.presentAlert(
      'Warning',
      'You are deleting data',
      'Are you sure you want to delete this movie?',
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.firebase.delete(this.movie.id);
            this.router.navigate(['/home']);
          },
        },
      ]
    );
  }

  private async presentAlert(
    header: string,
    subHeader: string,
    message: string,
    buttons: any[]
  ) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: buttons,
    });

    await alert.present();
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  enableEdit() {
    this.canEdit = this.canEdit ? false : true;
  }
}
