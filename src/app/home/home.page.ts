import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../model/services/firebase.service';
import { Movie } from '../model/entities/Movie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  movies: Movie[] = [];


  constructor(
    private router: Router,
    private firebase: FirebaseService
  ) {
    this.firebase.read().subscribe(res =>{
      this.movies = res.map(movie => {
        return {
          id: movie.payload.doc.id,
          ...movie.payload.doc.data() as any
        } as Movie;
      })
    })
  }

  goToRegister() {
    this.router.navigate(["/register-movie"])
  }

  goToEdit(movie: Movie) {
    this.router.navigateByUrl("/view-movie", {state: {movie: movie}});
  }
}
