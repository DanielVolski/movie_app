import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { Movie } from '../../model/entities/Movie';
import { AuthService } from 'src/app/model/services/auth.service';
import { AlertService } from 'src/app/model/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public movies: Movie[] = [];
  movies_saved: Movie[] = [];
  query: any;
  isLoading: boolean = false;
  public user: any;
  emptyScreenModel = {
    title: 'No movies found',
    icon: "sad-outline"
  }

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private auth: AuthService,
    private alert: AlertService
  ) {
    this.isLoading = true;
    this.user = this.auth.getUserLogged();
    this.firebase.read(this.user.uid).subscribe(res => {
      this.movies = res.map(movie => {
        return {
          id: movie.payload.doc.id,
          ...movie.payload.doc.data() as any
        } as Movie;
      })
      this.movies_saved = this.movies;
    });
    this.isLoading = false;
  }

  onSearchChange(event: any) {
    this.isLoading = true;
    this.query = event.detail.value.toLowerCase();
    if (this.query.length > 0) {
      this.movies = this.movies_saved;
      this.movies = this.movies.filter(movie =>
        movie.title.toLowerCase().includes(this.query)
      );
    } else {
      this.movies = this.movies_saved;
    }
    this.isLoading = false;
  }

  goToRegister() {
    this.router.navigate(["/register-movie"])
  }

  logout() {
    this.alert.confirmLogOut(this.user.uid);
  }

}
