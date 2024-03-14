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
  event: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  public image: any;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alert: AlertService,
    private auth: AuthService,
  ) {
    this.isLoading = true;
    this.isLoading = false;
    this.user = this.auth.getUserLogged();
  }
  ngOnInit() {}

  onUploadFile(event: any) {
    this.image = event.target.files;
  }

  onCreateMovie(event: Movie) {
    this.firebase.uploadMovie(
      this.image,
      new Movie(
        event.title,
        event.director,
        event.writer,
        event.releaseDate,
        event.genres,
        this.user.uid
      )
    );
    this.alert.presentAlert('Sucess', 'Movie created successfully').then(() => {
      this.router.navigate(['/home']);
    });

  }

}
