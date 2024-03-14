import { createReducer, on } from '@ngrx/store';
import * as SongActions from '../actions/song.actions';
import { Song } from '../../interfaces/song.interface';

export interface SongState {
  songs: Song[];
  currentSong: Song | null;
  loading: boolean;
  error: any;
  isDeleted: boolean;
  lastAddedSongId: number | undefined;
}

export const initialState: SongState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
  isDeleted: false,
  lastAddedSongId: undefined,
};

export const songReducer = createReducer(
  initialState,
  on(SongActions.loadSongs, (state) => ({ ...state, loading: true })),
  on(SongActions.loadSongsSuccess, (state, { songs }) => ({
    ...state,
    songs,
    loading: false,
  })),
  on(SongActions.loadSongsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(SongActions.addSong, (state) => ({ ...state, loading: true })),
  on(SongActions.addSongSuccess, (state, { song }) => ({
    ...state,
    songs: [...state.songs, song],
    lastAddedSongId: song.id,
    loading: false,
  })),
  on(SongActions.addSongFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(SongActions.loadSong, (state) => ({ ...state, loading: true })),
  on(SongActions.loadSongSuccess, (state, { song }) => ({
    ...state,
    currentSong: song,
    loading: false,
  })),
  on(SongActions.loadSongFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(SongActions.updateSong, (state) => ({ ...state, loading: true })),
  // Suponiendo que tienes acciones correspondientes para éxito y fallo de la actualización
  on(SongActions.updateSongSuccess, (state, { song }) => ({
    ...state,
    songs: state.songs.map((s) => (s.id === song.id ? song : s)),
    loading: false,
  })),
  on(SongActions.updateSongFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),

  on(SongActions.deleteSong, (state) => ({ ...state, loading: true })),
  on(SongActions.deleteSongSuccess, (state, { id }) => ({
    ...state,
    songs: state.songs.filter((s) => s.id !== id),
    isDeleted: true,
    loading: false,
  })),
  on(SongActions.deleteSongFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))

  // Otras acciones...
);
