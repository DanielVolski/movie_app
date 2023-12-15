import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Movie } from '../entities/Movie';
import { finalize } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private PATH: string = 'movies';

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  create(movie: Movie) {
    return this.firestore.collection(this.PATH).add({
      title: movie.title,
      director: movie.director,
      writer: movie.writer,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
      downloadURL: movie.downloadURL,
      uid: movie.uid
    });
  }

  update(movie: Movie, id: string) {
    return this.firestore.collection(this.PATH).doc(id).update({
      title: movie.title,
      director: movie.director,
      writer: movie.writer,
      releaseDate: movie.releaseDate,
      genres: movie.genres,
      downloadURL: movie.downloadURL,
      uid: movie.uid
    });
  }

  uploadMovie(image: any, movie: Movie) {
    if (image != null) {
      const file = image.item(0);
      if (file.type.split('/')[0] !== 'image') {
        console.error('File type is not supported!');
        return;
      }
      const path = `movies/${movie.title}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path, file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            let uploadFileURL = fileRef.getDownloadURL();
            uploadFileURL.subscribe((url) => {
              movie.downloadURL = url;
              if (movie.id == null) {
                this.create(movie);
              } else {
                this.update(movie, movie.id);
              }
            });
          })
        )
        .subscribe();
    }
    else {
      if (movie.id == null) {
        this.create(movie);
      } else {
        this.update(movie, movie.id);
      }
    }
  }

  delete(id: string) {
    return this.firestore.collection(this.PATH).doc(id).delete();
  }

  read(uid: string) {
    return this.firestore.collection(this.PATH, ref => ref.where('uid', '==', uid)
    ).snapshotChanges();
  }
}
