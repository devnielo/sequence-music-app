import { createAction, props } from '@ngrx/store';
import { Artist } from '../../interfaces/artist.interface';

export enum ArtistActionTypes {
  LOAD_ARTISTS = '[Artists] Load Artists',
  LOAD_ARTISTS_SUCCESS = '[Artists] Load Artists Success',
  LOAD_ARTISTS_FAILURE = '[Artists] Load Artists Failure'
}

export const loadArtists = createAction(
  ArtistActionTypes.LOAD_ARTISTS
);

export const loadArtistsSuccess = createAction(
  ArtistActionTypes.LOAD_ARTISTS_SUCCESS,
  props<{ artists: Artist[] }>()
);

export const loadArtistsFailure = createAction(
  ArtistActionTypes.LOAD_ARTISTS_FAILURE,
  props<{ error: any }>()
);
