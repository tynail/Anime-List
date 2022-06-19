import { Component, OnInit } from '@angular/core';
import { Serie } from '../serie';
import { SerieService } from '../serie.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css'],
})
export class SerieComponent implements OnInit {
  selectedserie: Serie;
  series: Serie[];
  constructor(private serieService: SerieService) {}

  ngOnInit(): void {
    this.getserie();
  }

  public getserie(): void {
    this.serieService.getSeries().subscribe((series) => (this.series = series));
  }

  public add(name: string): void {
    name = name.trim();
    if (!name) return;
    this.serieService
      .addSerie({ name } as Serie)
      .subscribe((serie) => this.series.push(serie));
  }

  public delete(serie: Serie): void {
    this.series = this.series.filter((a) => a !== serie);
    this.serieService.deleteSerie(serie).subscribe();
  }
}
