import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/entities/Movie';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/model/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators
} from '@angular/forms';
import { AlertService } from 'src/app/model/services/alert.service';

@Component({
  selector: 'app-view-movie',
  templateUrl: './view-movie.page.html',
  styleUrls: ['./view-movie.page.scss'],
})
export class ViewMoviePage implements OnInit {
  formMovie: FormGroup;
  movie!: Movie;
  public poster: any;
  public user: any;
  isDisabled: boolean = true;
  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alertService: AlertService,
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
    this.formMovie = this.formBuilder.group({
      title: [this.movie.title, [Validators.required]],
      director: [this.movie.director, [Validators.required]],
      writer: [this.movie.writer, [Validators.required]],
      releaseDate: [this.movie.releaseDate, [Validators.required]],
      genres: [this.movie.genres, [Validators.required]],
    });
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
      this.formMovie.value.title,
      this.formMovie.value.director,
      this.formMovie.value.writer,
      this.formMovie.value.releaseDate,
      this.formMovie.value.genres,
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
    this.alertService.presentAlert('Sucess', 'The movie has been updated');
    this.backToHome()
  }

  delete() {
    this.alertService.deleteMovieAlert(this.movie.id);
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  enableEdit() {
    this.isDisabled = !this.isDisabled;
  }
}
