import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.component.html',
  styleUrls: ['./anime.component.css'],
})
export class AnimeComponent implements OnInit {
  selectedAnime: Anime;
  animes: Anime[];
  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.getAnime();
  }

  public getAnime(): void {
    this.animeService.getAnimes().subscribe((animes) => (this.animes = animes));
  }

  public add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.animeService
      .addAnime({ name } as Anime)
      .subscribe((anime) => this.animes.push(anime));
  }

  public delete(anime: Anime): void {
    this.animes = this.animes.filter((a) => a !== anime);
    this.animeService.deleteAnime(anime).subscribe();
  }
}
