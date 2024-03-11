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
  formMovie: FormGroup = new FormGroup({});
  isLoading: boolean = false;
  public image: any;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alert: AlertService,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.isLoading = true;
    this.isLoading = false;
  }
  ngOnInit() {

  }
    
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
