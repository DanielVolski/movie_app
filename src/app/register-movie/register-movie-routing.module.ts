import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterMoviePage } from './register-movie.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterMoviePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterMoviePageRoutingModule {}
