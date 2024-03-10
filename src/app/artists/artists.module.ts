import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArtistsRoutingModule } from './artists-routing.module';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { FormPageComponent } from './pages/form-page/form-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { SharedModule } from '../shared/shared.module';
import { artistReducer } from './store/reducers/artist.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ArtistEffects } from './store/effects/artist.effects';

@NgModule({
  declarations: [DetailPageComponent, FormPageComponent, ListPageComponent],
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    SharedModule,
    StoreModule.forFeature('artists', artistReducer),
    EffectsModule.forFeature([ArtistEffects]),
  ],
})
export class ArtistsModule {}
