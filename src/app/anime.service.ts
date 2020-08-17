import { Injectable } from '@angular/core';
import { Anime } from './anime';
import { ANIMES } from './mock-animes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private animesUrl = 'api/animes';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  /**
   * Handle Http operation that failed.
   * Let the app continue
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Send the error to remote logging infrastructure
      console.error(error);

      //Transform error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  private log(message: string): void {
    this.messageService.add(`Anime service ${message}`);
  }

  public getAnimes(): Observable<Anime[]> {
    this.messageService.add('AnimeService: fetched animes');
    return (
      this.http
        .get<Anime[]>(this.animesUrl)
        // catchError intercepts an Observable that failed
        .pipe(catchError(this.handleError<Anime[]>('getAnimes', [])))
    );
  }

  public getAnime(id: number): Observable<Anime> {
    const url = `${this.animesUrl}/${id}`;
    return this.http.get<Anime>(url).pipe(
      tap((_) => this.log(`fetched anime id=${id}`)),
      catchError(this.handleError<Anime>(`getAnime id=${id}`))
    );
  }

  public updateAnime(anime: Anime): Observable<any> {
    return this.http.put<Anime>(this.animesUrl, anime, this.httpOptions).pipe(
      tap((_) => this.log(`updated anime id=${anime.id}`)),
      catchError(this.handleError<any>('updateAnime'))
    );
  }
}
