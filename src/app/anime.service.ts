import { Injectable } from '@angular/core';
import { Anime } from './anime';
import { ANIMES } from './mock-animes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor() {}
  getAnimes(): Observable<Anime[]> {
    return of(ANIMES);
  }
}
