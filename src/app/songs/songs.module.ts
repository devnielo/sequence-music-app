import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { songReducer } from './store/reducers/song.reducer';
import { SongEffects } from './store/effects/song.effects';

import { ListPageComponent } from './pages/list-page/list-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { SharedModule } from '../shared/shared.module';
import { SafeHtmlPipe } from '../shared/pipes/safe-html.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListPageComponent,
    DetailPageComponent,
    FormPageComponent,
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('songs', songReducer),
    EffectsModule.forFeature([SongEffects]),
  ],
})
export class SongsModule {}
