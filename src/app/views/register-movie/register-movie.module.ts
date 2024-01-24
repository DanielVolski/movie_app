import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMoviePageRoutingModule } from './register-movie-routing.module';

import { RegisterMoviePage } from './register-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterMoviePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterMoviePage]
})
export class RegisterMoviePageModule {}
