import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Page } from './shared/error404-page/error404-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  {
    path: 'songs',
    loadChildren: () =>
      import('./songs/songs.module').then((m) => m.SongsModule),
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('./companies/companies.module').then((m) => m.CompaniesModule),
  },
  {
    path: 'artists',
    loadChildren: () =>
      import('./artists/artists.module').then((m) => m.ArtistsModule),
  },
  {
    path: '404',
    component: Error404Page,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
