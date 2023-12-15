import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./views/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'register-movie',
    loadChildren: () =>
      import('./views/register-movie/register-movie.module').then(
        (m) => m.RegisterMoviePageModule
      ),
  },
  {
    path: 'view-movie',
    loadChildren: () =>
      import('./views/view-movie/view-movie.module').then(
        (m) => m.ViewMoviePageModule
      ),
  },
  {
    path: 'signin',
    loadChildren: () => import('./views/auth/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./views/auth/signup/signup.module').then( m => m.SignupPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
