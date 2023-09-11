import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../model/services/firebase.service';
import { Movie } from '../model/entities/Movie';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage{
title!: string;
genres: string[] = []


  constructor(
    private router: Router,
    private firebase: FirebaseService
  ) {}

  read() {
    
  }

}
