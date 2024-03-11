import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';

// Selecciona el estado de las canciones
export const selectSongState = createFeatureSelector<SongState>('songs');

// Selecciona todas las canciones
export const selectAllSongs = createSelector(
  selectSongState,
  (state: SongState) => state.songs
);

// Selecciona el estado de carga de las canciones
export const selectSongsLoading = createSelector(
  selectSongState,
  (state: SongState) => state.loading
);

// Selecciona la canción actual
export const selectCurrentSong = createSelector(
  selectSongState,
  (state: SongState) => state.currentSong
);

// Selector para obtener cualquier error relacionado con las canciones
export const selectSongsError = createSelector(
  selectSongState,
  (state: SongState) => state.error
);
