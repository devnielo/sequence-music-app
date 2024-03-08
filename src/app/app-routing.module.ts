import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404PageComponentComponent } from './shared/error404-page-component/error404-page-component.component';

const routes: Routes = [
  {
    path: 'songs',
    loadChildren: () =>
      import('./songs/songs.module').then((m) => m.SongsModule),
  },
  {
    path: '404',
    component: Error404PageComponentComponent,
  },
  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full',
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
