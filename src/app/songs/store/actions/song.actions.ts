import { createAction, props } from '@ngrx/store';
import { Song } from '../../interfaces/song.interface';

export enum SongActionTypes {
  LOAD_SONGS = '[Songs] Load Songs',
  LOAD_SONGS_SUCCESS = '[Songs] Load Songs Success',
  LOAD_SONGS_FAILURE = '[Songs] Load Songs Failure',
  LOAD_SONG = '[Song] Load Song',
  LOAD_SONG_SUCCESS = '[Song] Load Song Success',
  LOAD_SONG_FAILURE = '[Song] Load Song Failure',
  ADD_SONG = '[Song] Add Song',
  ADD_SONG_SUCCESS = '[Song] Add Song Success',
  ADD_SONG_FAILURE = '[Song] Add Song Failure',
  UPDATE_SONG = '[Song] Update Song',
  UPDATE_SONG_SUCCESS = '[Song] Update Song Success',
  UPDATE_SONG_FAILURE = '[Song] Update Song Failure',
  DELETE_SONG = '[Song] Delete Song',
  DELETE_SONG_SUCCESS = '[Song] Delete Song Success',
  DELETE_SONG_FAILURE = '[Song] Delete Song Failure'
}

// Acciones para cargar todas las canciones
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

// Acciones para cargar una canción específica
export const loadSong = createAction(
  SongActionTypes.LOAD_SONG,
  props<{ id: number }>()
);

export const loadSongSuccess = createAction(
  SongActionTypes.LOAD_SONG_SUCCESS,
  props<{ song: Song }>()
);

export const loadSongFailure = createAction(
  SongActionTypes.LOAD_SONG_FAILURE,
  props<{ error: any }>()
);

// Acciones para agregar una canción
export const addSong = createAction(
  SongActionTypes.ADD_SONG,
  props<{ song: Song }>()
);

export const addSongSuccess = createAction(
  SongActionTypes.ADD_SONG_SUCCESS,
  props<{ song: Song }>()
);

export const addSongFailure = createAction(
  SongActionTypes.ADD_SONG_FAILURE,
  props<{ error: any }>()
);

// Acciones para actualizar una canción
export const updateSong = createAction(
  SongActionTypes.UPDATE_SONG,
  props<{ song: Song }>()
);

export const updateSongSuccess = createAction(
  SongActionTypes.UPDATE_SONG_SUCCESS,
  props<{ song: Song }>()
);

export const updateSongFailure = createAction(
  SongActionTypes.UPDATE_SONG_FAILURE,
  props<{ error: any }>()
);

// Acciones para eliminar una canción
export const deleteSong = createAction(
  SongActionTypes.DELETE_SONG,
  props<{ id: number }>()
);

export const deleteSongSuccess = createAction(
  SongActionTypes.DELETE_SONG_SUCCESS,
  props<{ id: number }>()
);

export const deleteSongFailure = createAction(
  SongActionTypes.DELETE_SONG_FAILURE,
  props<{ error: any }>()
);
