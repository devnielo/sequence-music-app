// src/app/songs/store/selectors/song.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';

// Selector para obtener el feature state
export const selectSongFeature = createFeatureSelector<SongState>('songs');

// Selector para obtener todas las canciones
export const selectAllSongs = createSelector(
  selectSongFeature,
  (state: SongState) => state.songs
);

// Selector para obtener el estado de carga
export const selectSongsLoading = createSelector(
  selectSongFeature,
  (state: SongState) => state.loading
);

// Selector para obtener el posible error
export const selectSongsError = createSelector(
  selectSongFeature,
  (state: SongState) => state.error
);
