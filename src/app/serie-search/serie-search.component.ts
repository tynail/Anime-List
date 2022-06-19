import { SerieService } from '../serie.service';
import { Serie } from '../serie';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-serie-search',
  templateUrl: './serie-search.component.html',
  styleUrls: ['./serie-search.component.css'],
})
export class SerieSearchComponent implements OnInit {
  series$: Observable<Serie[]>;
  private searchTerms = new Subject<string>();

  constructor(private serieService: SerieService) {}

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.series$ = this.searchTerms.pipe(
      // wait 300 ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.serieService.searchSerie(term))
    );
  }
}
