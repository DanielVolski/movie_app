import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewMoviePage } from './view-movie.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMoviePageRoutingModule {}
