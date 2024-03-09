import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingFormComponent } from './loading-form/loading-form.component';



@NgModule({
  declarations: [MovieCardComponent, EmptyScreenComponent, LoadingFormComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MovieCardComponent, EmptyScreenComponent, LoadingFormComponent]
})
export class ComponentsModule { }
