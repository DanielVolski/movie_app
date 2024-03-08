import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../model/services/firebase.service';
import { Movie } from '../../model/entities/Movie';
import { AuthService } from 'src/app/model/services/auth.service';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/model/services/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
  movies: Movie[] = [];
  query: any;
  isLoading: boolean = false;
  public user: any;

  constructor(
    private router: Router,
    private firebase: FirebaseService,
    private auth: AuthService,
    private alertController: AlertController,
    private alert: AlertService
  ) {
    this.user = this.auth.getUserLogged();
    this.firebase.read(this.user.uid).subscribe(res =>{
      this.movies = res.map(movie => {
        return {
          id: movie.payload.doc.id,
          ...movie.payload.doc.data() as any
        } as Movie;
      })
    })
  }

  async onSearchChange(event: any) {
    this.query = event.detail.value.toLowerCase();
    this.movies = [];
    if (this.query.length > 0) {
      this.isLoading = true;
      this.firebase.read(this.user.id, ['title', '==', this.query]).subscribe(async (res) => {
        this.movies = await res.map(movie => {
          return {
            id: movie.payload.doc.id,
            ...movie.payload.doc.data() as any
          } as Movie;
          });
          this.isLoading = false;
        }); 
    }
  }

  goToRegister() {
    this.router.navigate(["/register-movie"])
  }
  
  logout(){
    this.alert.confirmAlert(this.user.uid);
  }
}
