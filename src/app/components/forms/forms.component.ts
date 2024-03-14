import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { Movie } from '../../model/entities/Movie';
import { AlertService } from 'src/app/model/services/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {

  @Input() movie!: Movie; 
  @Output() movieCreated = new EventEmitter<Movie>();
  @Output() movieDeleted = new EventEmitter<Movie>();
  @Output() movieUpdated = new EventEmitter<Movie>();
  @Output() imageUploaded = new EventEmitter<any>();
  formMovie: FormGroup = new FormGroup({});
  image: any;
  public user: any;
  public poster: any = null;
  isDisabled: boolean = true;
  constructor(private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    if (!this.movie){
      this.isDisabled = false;
    }
    this.formMovie = this.formBuilder.group({
      title: [this.movie ? this.movie.title : '', Validators.required],
      director: [this.movie ? this.movie.director : '', Validators.required],
      writer: [this.movie ? this.movie.writer : '', Validators.required],
      releaseDate: [this.movie ? this.movie.releaseDate :'', [Validators.required]],
      genres: [this.movie ? this.movie.genres : '', Validators.required],
    });
  }

  submitForm(){
    if (!this.formMovie.valid)
      return false;
    return true;
  }

  uploadFile(image: any) {
    this.imageUploaded.emit(image);
  }

  create() {
    this.movieCreated.emit(this.formMovie.value);
  }
  
  edit() {
    this.movieUpdated.emit(this.formMovie.value);
  }
  
  delete() {
    this.movieDeleted.emit(this.movie);
  }

  enableButton() {
    if (this.isDisabled) {
      this.isDisabled = false;
    }
    else {
      this.isDisabled = true;
    }
  }

}


