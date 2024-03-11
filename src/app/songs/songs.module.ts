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
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { uiReducer } from '../shared/store/effects/ui.effects';

@NgModule({
  declarations: [ListPageComponent, DetailPageComponent, FormPageComponent],
  imports: [
    CommonModule,
    SongsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    TranslateModule,
    StoreModule.forFeature('songs', songReducer),
    StoreModule.forFeature('ui', uiReducer),
    EffectsModule.forFeature([SongEffects]),
  ],
  exports: [DetailPageComponent],
})
export class SongsModule {}
