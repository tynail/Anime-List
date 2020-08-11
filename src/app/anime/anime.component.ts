import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  selectedAnime: Anime;
  animes: Anime[];
  constructor(private animeService: AnimeService) {}

  getAnime(): void {
    this.animeService.getAnimes().subscribe((animes) => (this.animes = animes));
  }

  onSelect(anime: Anime): void {
    this.selectedAnime = anime;
  }

  ngOnInit(): void {
    this.getAnime();
  }
}
