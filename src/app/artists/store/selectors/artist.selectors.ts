import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtistState } from '../reducers/artist.reducers';

export const selectArtistFeature = createFeatureSelector<ArtistState>('artists');

export const selectAllArtists = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.artists
);

export const selectArtistsLoading = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.loading
);

export const selectArtistsError = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.error
);
