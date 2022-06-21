import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Serie } from '../models/serie';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root',
})
export class SerieService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  private baseAPIUrl = 'api';
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
    this.messageService.add(`Serie service ${message}`);
  }

  public getSeries(): Observable<Serie[]> {
    return (
      this.http
        .get<Serie[]>(`${this.baseAPIUrl}/series`)
        // catchError intercepts an Observable that failed
        .pipe(
          tap((_) => this.log(`fetched series`)),
          catchError(this.handleError<Serie[]>('getSeries', []))
        )
    );
  }

  public getSerie(id: number): Observable<Serie> {
    const url = `${this.baseAPIUrl}/serie/${id}`;

    return this.http.get<Serie>(url).pipe(
      tap((_) => this.log(`fetched serie id=${id}`)),
      catchError(this.handleError<Serie>(`getSerie id=${id}`))
    );
  }

  public addSerie(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(this.baseAPIUrl, serie, this.httpOptions).pipe(
      tap((newSerie: Serie) => this.log(`Added serie id=${newSerie.id}`)),
      catchError(this.handleError<Serie>('AddSerie'))
    );
  }

  public updateSerie(serie: Serie): Observable<Serie> {
    return this.http.put<Serie>(this.baseAPIUrl, serie, this.httpOptions).pipe(
      tap((_) => this.log(`updated serie id=${serie.id}`)),
      catchError(this.handleError<Serie>('updateSerie'))
    );
  }

  public deleteSerie(serie: Serie | number): Observable<Serie> {
    const id = typeof serie === 'number' ? serie : serie.id;
    const url = `${this.baseAPIUrl}/${id}`;

    return this.http.delete<Serie>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Deleted serie id = ${id}`)),
      catchError(this.handleError<Serie>('deleteSerie'))
    );
  }

  public searchSerie(term: string): Observable<Serie[]> {
    if (!term.trim()) {
      // if not search term return empty series array
      return of([]);
    }
    return this.http.get<Serie[]>(`${this.baseAPIUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found series matching "${term}" `)
          : this.log(`found no series matching "${term}" `)
      ),
      catchError(this.handleError<Serie[]>('searchSerie', []))
    );
  }
}
