import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register-movie',
    loadChildren: () =>
      import('./register-movie/register-movie.module').then(
        (m) => m.RegisterMoviePageModule
      ),
  },
  {
    path: 'view-movie',
    loadChildren: () =>
      import('./view-movie/view-movie.module').then(
        (m) => m.ViewMoviePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
