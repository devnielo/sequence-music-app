import { createAction, props } from '@ngrx/store';
import { Song } from '../../interfaces/song.interface';

// Enumeración para tipos de acciones para evitar errores tipográficos
export enum SongActionTypes {
  LOAD_SONGS = '[Songs] Load Songs',
  LOAD_SONGS_SUCCESS = '[Songs] Load Songs Success',
  LOAD_SONGS_FAILURE = '[Songs] Load Songs Failure',
}

// Acciones para cargar canciones
export const loadSongs = createAction(
  SongActionTypes.LOAD_SONGS
);

export const loadSongsSuccess = createAction(
  SongActionTypes.LOAD_SONGS_SUCCESS,
  props<{ songs: Song[] }>()
);

export const loadSongsFailure = createAction(
  SongActionTypes.LOAD_SONGS_FAILURE,
  props<{ error: any }>()
);
