import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { IonicModule } from '@ionic/angular';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { LoadingFormComponent } from './loading-form/loading-form.component';
import { LoadingHomeComponent } from './loading-home/loading-home.component';



@NgModule({
  declarations: [MovieCardComponent, EmptyScreenComponent, LoadingFormComponent, LoadingHomeComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MovieCardComponent, EmptyScreenComponent, LoadingFormComponent, LoadingHomeComponent]
})
export class ComponentsModule { }
