import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { songReducer } from './store/reducers/song.effects';
import { SongEffects } from './store/effects/song.effects';

import { SongListComponent } from './components/song-list/song-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongFormComponent } from './components/song-form/song-form.component';

@NgModule({
  declarations: [SongListComponent, SongDetailComponent, SongFormComponent],
  imports: [
    CommonModule,
    SongsRoutingModule,
    SharedModule,
    StoreModule.forFeature('songs', songReducer),
    EffectsModule.forFeature([SongEffects])  ],
})
export class SongsModule {}
