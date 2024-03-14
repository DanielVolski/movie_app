import { Component, OnInit } from '@angular/core';
import { Movie } from '../../model/entities/Movie';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { AuthService } from 'src/app/model/services/auth.service';
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
    private firebase: FirebaseService,
    private alert: AlertService
  ) {
    this.user = this.auth.getUserLogged();
  }

  ngOnInit() {
    this.movie = history.state.movie;
  }

  onUploadFile(event: any) {
    this.poster = event.target.files;
  }

  onUpdatedMovie(event: Movie) {
    let updated: Movie = new Movie(
      event.title,
      event.director,
      event.writer,
      event.releaseDate,
      event.genres,
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
    this.alert.presentAlert('Sucess', 'The movie has been updated').then(() => {  
      this.router.navigate(['/home']);
    });
    
  }

  onDeletedMovie(event: Movie) {
    this.alert.deleteMovieAlert(event.id);
  }
}
