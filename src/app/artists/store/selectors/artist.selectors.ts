import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ArtistState } from '../reducers/artist.reducers';

// Selector para obtener el feature state de los artistas
export const selectArtistFeature = createFeatureSelector<ArtistState>('artists');
export const selectArtistState = createFeatureSelector<ArtistState>('artists');

// Selector para obtener todos los artistas
export const selectAllArtists = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.artists
);

// Selector para obtener la información de carga
export const selectArtistsLoading = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.loading
);

// Selector para obtener un artista específico
export const selectCurrentArtist = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.currentArtist
);

// Selector para obtener cualquier error relacionado con los artistas
export const selectArtistsError = createSelector(
  selectArtistFeature,
  (state: ArtistState) => state.error
);

export const selectArtistById = (artistId: number) => createSelector(
  selectAllArtists,
  (artists) => artists.find(artist => artist.id === artistId)
);


