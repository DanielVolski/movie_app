import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { Movie } from '../../model/entities/Movie';
import { AlertService } from 'src/app/model/services/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {

  @Input() movie!: Movie;;
  @Output() movieCreated = new EventEmitter<Movie>();
  formMovie: FormGroup = new FormGroup({});
  image: any;
  public user: any;
  public poster: any;
  isDisabled: boolean = true;

  constructor(private router: Router,
    private firebase: FirebaseService,
    private alert: AlertService,
    private auth: AuthService,
    private formBuilder: FormBuilder) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.formMovie = this.formBuilder.group({
      title: [this.movie ? this.movie.title : '', Validators.required],
      director: [this.movie ? this.movie.director : '', Validators.required],
      writer: [this.movie ? this.movie.writer : '', Validators.required],
      releaseDate: [this.movie ? this.movie.releaseDate :'', [Validators.required]],
      genres: [this.movie ? this.movie.genres : '', Validators.required],
    });
  }
  submitForm() {
    if (!this.formMovie.valid)
      return false;
    this.create();
    return true;
  }

  uploadFile(image: any) {
    this.image = image.files;
  }

  create() {
    this.firebase.uploadMovie(
      this.image,
      new Movie(
        this.formMovie.value['title'],
        this.formMovie.value['director'],
        this.formMovie.value['writer'],
        this.formMovie.value['releaseDate'],
        this.formMovie.value['genres'],
        this.user.uid
      )
    );
    this.movieCreated.emit();
    this.router.navigate(['/home']);
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
    this.alert.presentAlert('Sucess', 'The movie has been updated');
    this.backToHome()
  }

  delete() {
    console.log(this.movie.id)
    this.alert.deleteMovieAlert(this.movie.id);
  }

  enableEdit() {
    this.isDisabled = !this.isDisabled;
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

}


