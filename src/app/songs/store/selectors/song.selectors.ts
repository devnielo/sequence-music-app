import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';

// Selector para obtener el feature state de las canciones
export const selectSongFeature = createFeatureSelector<SongState>('songs');

// Selector para obtener todas las canciones
export const selectAllSongs = createSelector(
  selectSongFeature,
  (state: SongState) => state.songs
);

// Selector para obtener la información de carga
export const selectSongsLoading = createSelector(
  selectSongFeature,
  (state: SongState) => state.loading
);

// Selector para obtener una canción específica
export const selectCurrentSong = createSelector(
  selectSongFeature,
  (state: SongState) => state.currentSong
);

// Selector para obtener cualquier error relacionado con las canciones
export const selectSongsError = createSelector(
  selectSongFeature,
  (state: SongState) => state.error
);
