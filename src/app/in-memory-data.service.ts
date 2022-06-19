import { Serie } from './serie';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const series = [
      {
        id: 1,
        name: 'Hajime no Ippo',
        numberOfEpisode: 127,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 2,
        name: 'Parasite',
        numberOfEpisode: 24,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 3,
        name: 'Sword Art Online',
        numberOfEpisode: 73,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 4,
        name: 'Mirrai Nikki',
        numberOfEpisode: 26,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 5,
        name: 'Samurai Champloo',
        numberOfEpisode: 26,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 6,
        name: 'Death Note',
        numberOfEpisode: 37,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 7,
        name: 'Bleach',
        numberOfEpisode: 366,
        numberOfWatchedEpisode: 0,
      },
      {
        id: 8,
        name: 'Full Metal Alchemist Brotherhood',
        numberOfEpisode: 64,
        numberOfWatchedEpisode: 0,
      },
    ];
    return { series };
  }
  genId(series: Serie[]): number {
    return series.length > 0
      ? Math.max(...series.map((serie) => serie.id)) + 1
      : 11;
  }
  constructor() {}
}
