import { SerieService } from '../../services/serie.service';
import { Component, OnInit, Input } from '@angular/core';
import { Serie } from '../../models/serie';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-serie-detail',
  templateUrl: './serie-detail.component.html',
  styleUrls: ['./serie-detail.component.css'],
})
export class SerieDetailComponent implements OnInit {
  public serie: Serie;

  constructor(
    private serieService: SerieService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getSerie();
  }

  getSerie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serieService.getSerie(id).subscribe((serie) => (this.serie = serie));
  }

  save(): void {
    this.serieService.updateSerie(this.serie).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
