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
    private AnimeService: AnimeService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAnime();
  }

  getAnime(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // Javascript + operator convert string to number
    this.AnimeService.getAnime(id).subscribe((anime) => (this.anime = anime));
  }

  goBack(): void {
    this.location.back();
  }
}
