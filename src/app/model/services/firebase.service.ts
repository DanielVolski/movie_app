import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Movie } from '../entities/Movie';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH: string = 'movies';

  constructor(private firestore: AngularFirestore) { }

  create(movie: Movie) {
    return this.firestore.collection(this.PATH).add({
      title: movie.title,
      director: movie.director,
      writer: movie.writer,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
    });
  }

  update(movie: Movie, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      title: movie.title,
      director: movie.director,
      writer: movie.writer,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
    });
  }

  delete(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  read() {
    return this.firestore.collection(this.PATH).snapshotChanges();
  }
}
