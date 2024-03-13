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
  isLoading: boolean = false;
  movie!: Movie;
  public poster: any;
  public user: any;
  isDisabled: boolean = true;
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.movie = history.state.movie;
  }

  backToHome() {
    this.router.navigate(['/home']);
  }
}
