import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SerieComponent } from './components/serie/serie.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SerieDetailComponent } from './components/serie-detail/serie-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'series', component: SerieComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: SerieDetailComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
