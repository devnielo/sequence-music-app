// src/app/songs/store/reducers/song.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as SongActions from '../actions/song.actions';
import { Song } from '../../interfaces/song.interface';

export interface SongState {
  songs: Song[];
  loading: boolean;
  error: any;
}

export const initialState: SongState = {
  songs: [],
  loading: false,
  error: null
};

export const songReducer = createReducer(
  initialState,
  on(SongActions.loadSongs, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(SongActions.loadSongsSuccess, (state, { songs }) => ({
    ...state,
    loading: false,
    songs: songs,
    error: null
  })),
  on(SongActions.loadSongsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
