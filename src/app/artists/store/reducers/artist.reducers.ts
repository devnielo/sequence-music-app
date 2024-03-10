import { createReducer, on } from '@ngrx/store';
import * as ArtistActions from '../actions/artist.actions';
import { Artist } from '../../interfaces/artist.interface';

export interface ArtistState {
  artists: Artist[];
  loading: boolean;
  error: any;
}

export const initialState: ArtistState = {
  artists: [],
  loading: false,
  error: null
};

export const artistReducer = createReducer(
  initialState,
  on(ArtistActions.loadArtists, state => ({ ...state, loading: true })),
  on(ArtistActions.loadArtistsSuccess, (state, { artists }) => ({ ...state, loading: false, artists })),
  on(ArtistActions.loadArtistsFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
