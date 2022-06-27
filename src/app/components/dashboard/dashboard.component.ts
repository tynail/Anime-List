import { Component, OnInit } from '@angular/core';
import { Serie } from '../../models/serie';
import { SerieService } from '../../services/serie.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  series: Serie[] = [];
  constructor(private serieService: SerieService) {}

  ngOnInit(): void {
    this.getSeries();
  }

  getSeries(): void {
    this.serieService
      .getSeries()
      .subscribe((series) => (this.series = series.slice(0, 5)));
  }
}
