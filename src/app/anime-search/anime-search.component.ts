import { AnimeService } from './../anime.service';
import { Anime } from './../anime';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-anime-search',
  templateUrl: './anime-search.component.html',
  styleUrls: ['./anime-search.component.css'],
})
export class AnimeSearchComponent implements OnInit {
  animes$: Observable<Anime[]>;
  private searchTerms = new Subject<string>();

  constructor(private animeService: AnimeService) {}

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.animes$ = this.searchTerms.pipe(
      // wait 300 ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.animeService.searchAnime(term))
    );
  }
}
