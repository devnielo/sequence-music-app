import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongFormComponent } from './components/song-form/song-form.component';

const routes: Routes = [
  {
    path: '',
    component: SongListComponent,
  },
  {
    path: 'add',
    component: SongFormComponent,
  },
  {
    path: 'edit/:id',
    component: SongFormComponent,
  },
  {
    path: ':id',
    component: SongDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SongsRoutingModule {}
