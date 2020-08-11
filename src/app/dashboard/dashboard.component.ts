import { Component, OnInit } from '@angular/core';
import { Anime } from '../anime';
import { AnimeService } from '../anime.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  animes: Anime[] = [];
  constructor(private animeService: AnimeService) {}

  ngOnInit(): void {
    this.getAnimes();
  }

  getAnimes(): void {
    this.animeService
      .getAnimes()
      .subscribe((animes) => (this.animes = animes.slice(1, 5)));
  }
}
