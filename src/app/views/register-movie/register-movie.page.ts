import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { Movie } from '../../model/entities/Movie';
import { AlertService } from 'src/app/model/services/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-register-movie',
  templateUrl: './register-movie.page.html',
  styleUrls: ['./register-movie.page.scss'],
})
export class RegisterMoviePage implements OnInit {
  movie!: Movie;
  title!: string;
  director!: string;
  writer!: string;
  releaseDate!: string;
  genres: string[] = [];
  public image: any;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private alert: AlertService,
    private auth: AuthService
  ) {
    this.user = this.auth.getUserLogged();
  }

  uploadFile(image: any) {
    this.image = image.files;
  }

  create() {
    if (this.title && this.director && this.writer && this.genres.length > 0) {
      this.firebase.uploadMovie(
        this.image,
        new Movie(
          this.title,
          this.director,
          this.writer,
          this.releaseDate,
          this.genres,
          this.user.uid
        )
      );
      this.router.navigate(['/home']);
    } else {
      this.alert.presentAlert("All the fields needs to be filled!", "Empty Fields")
    }
  }

  ngOnInit() {}
}
