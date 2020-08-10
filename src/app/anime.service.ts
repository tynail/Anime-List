import { Injectable } from '@angular/core';
import { Anime } from './anime';
import { ANIMES } from './mock-animes';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor() {}
  getAnimes(): Anime[] {
    return ANIMES;
  }
}
