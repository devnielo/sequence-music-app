import { createReducer, on } from '@ngrx/store';
import * as SongActions from '../actions/song.actions';
import { Song } from '../../interfaces/song.interface';

export interface SongState {
  songs: Song[];
  currentSong: Song | null;
  loading: boolean;
  error: any;
}

export const initialState: SongState = {
  songs: [],
  currentSong: null,
  loading: false,
  error: null,
};

export const songReducer = createReducer(
  initialState,
  on(SongActions.loadingStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(SongActions.loadingComplete, (state) => ({
    ...state,
    loading: false,
  })),
  on(SongActions.loadSongs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SongActions.loadSongsSuccess, (state, { songs }) => ({
    ...state,
    loading: false,
    songs,
    error: null,
  })),
  on(SongActions.loadSongsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(SongActions.loadSong, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(SongActions.loadSongSuccess, (state, { song }) => ({
    ...state,
    currentSong: song,
    loading: false,
    error: null,
  })),
  on(SongActions.loadSongFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(SongActions.addSong, (state) => ({
    ...state,
    loading: true,
  })),
  on(SongActions.addSongSuccess, (state, { song }) => ({
    ...state,
    songs: [...state.songs, song],
    loading: false,
  })),
  on(SongActions.addSongFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(SongActions.editSong, (state, { id }) => ({
    ...state,
    currentSong: state.songs.find((song) => song.id === id) || null,
  })),
  on(SongActions.clearEditSong, (state) => ({
    ...state,
    currentSong: null,
  }))
);
