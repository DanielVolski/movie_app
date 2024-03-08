import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [MovieCardComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MovieCardComponent]
})
export class ComponentsModule { }
