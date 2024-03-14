import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';
import * as fromSongs from './song.selectors';
import * as fromCompanies from '../../../companies/store/selectors/company.selectors';
import * as fromArtists from '../../../artists/store/selectors/artist.selectors';
// Selecciona el estado de las canciones
export const selectSongState = createFeatureSelector<SongState>('songs');

// Selecciona todas las canciones
export const selectAllSongs = createSelector(
  selectSongState,
  (state: SongState) => {
    return state.songs;
  }
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

export const isSongDeleted = createSelector(
  selectSongState,
  (state: SongState) => state.isDeleted
);

export const selectLastAddedSongId = createSelector(
  selectSongState,
  (state: SongState) => state.lastAddedSongId
);

export const selectSongUpdateSuccess = createSelector(
  selectSongState,
  (state: SongState) => state.loading
);

export const selectSongUpdateFinished = createSelector(
  selectSongState,
  (state: SongState) => {
    return !state.loading;
  }
);
