import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterMoviePageRoutingModule } from './register-movie-routing.module';

import { RegisterMoviePage } from './register-movie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterMoviePageRoutingModule
  ],
  declarations: [RegisterMoviePage]
})
export class RegisterMoviePageModule {}
