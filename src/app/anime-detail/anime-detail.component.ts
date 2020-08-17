import { AnimeService } from './../anime.service';
import { Component, OnInit, Input } from '@angular/core';
import { Anime } from '../anime';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-anime-detail',
  templateUrl: './anime-detail.component.html',
  styleUrls: ['./anime-detail.component.css'],
})
export class AnimeDetailComponent implements OnInit {
  @Input() anime: Anime;

  constructor(
    private animeService: AnimeService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAnime();
  }

  getAnime(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // Javascript + operator convert string to number
    this.animeService.getAnime(id).subscribe((anime) => (this.anime = anime));
  }

  save(): void {
    this.animeService.updateAnime(this.anime).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
