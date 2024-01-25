import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewMoviePageRoutingModule } from './view-movie-routing.module';

import { ViewMoviePage } from './view-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMoviePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewMoviePage]
})
export class ViewMoviePageModule {}
