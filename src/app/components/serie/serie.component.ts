import { Component, OnInit } from '@angular/core';
import { Serie } from '../../models/serie';
import { SerieService } from '../../services/serie.service';

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

  // TODO: Need to pass more parameter for this method
  public add(name: string): void {
    name = name.trim();
    if (!name) return;

    const newSerie: Serie = {
      id: 30, // Make this a automatic generated id
      title: name,
      description: '',
      numberOfEpisode: 0, //tbd
      numberOfSeason: 0, // tbd
      numberOfWatchedEpisode: 0, // tbd
    };

    this.serieService
      .addSerie(newSerie)
      .subscribe((serie) => this.series.push(serie));
  }

  public delete(serie: Serie): void {
    this.series = this.series.filter((a) => a !== serie);
    this.serieService.deleteSerie(serie).subscribe();
  }
}
