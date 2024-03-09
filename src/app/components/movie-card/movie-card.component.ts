import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/model/entities/Movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent  implements OnInit {
  @Input() josney: any; 

  constructor(private router: Router,) { }

  goToEdit(movie: Movie) {
    this.router.navigateByUrl("/view-movie", {state: {movie: movie}});
  }

  ngOnInit() {}
}
