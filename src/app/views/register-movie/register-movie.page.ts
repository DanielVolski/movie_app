import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { Movie } from '../../model/entities/Movie';
import { AlertService } from 'src/app/model/services/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-movie',
  templateUrl: './register-movie.page.html',
  styleUrls: ['./register-movie.page.scss'],
})
export class RegisterMoviePage implements OnInit {
  formMovie: FormGroup;
  public image: any;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alert: AlertService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.user = this.auth.getUserLogged();
    this.formMovie = new FormGroup({
      title: new FormControl(''),
      director: new FormControl(''),
      writer: new FormControl(''),
      releaseDate: new FormControl(''),
      genres: new FormArray([]),
      uid: new FormControl('')
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
    this.router.navigate(['/home']);
  }

  ngOnInit() {
    this.formMovie = this.formBuilder.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      writer: ['', Validators.required],
      releaseDate: ['', [Validators.required]],
      genres: ['', Validators.required],
    });
  }
}
