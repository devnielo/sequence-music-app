import { createAction, props } from '@ngrx/store';
import { Artist } from '../../interfaces/artist.interface';

export enum ArtistActionTypes {
  LOAD_ARTISTS = '[Artists] Load Artists',
  LOAD_ARTISTS_SUCCESS = '[Artists] Load Artists Success',
  LOAD_ARTISTS_FAILURE = '[Artists] Load Artists Failure',
  LOAD_ARTIST = '[Artist] Load Artist',
  LOAD_ARTIST_SUCCESS = '[Artist] Load Artist Success',
  LOAD_ARTIST_FAILURE = '[Artist] Load Artist Failure',
  ADD_ARTIST = '[Artist] Add Artist',
  ADD_ARTIST_SUCCESS = '[Artist] Add Artist Success',
  ADD_ARTIST_FAILURE = '[Artist] Add Artist Failure',
  UPDATE_ARTIST = '[Artist] Update Artist',
  UPDATE_ARTIST_SUCCESS = '[Artist] Update Artist Success',
  UPDATE_ARTIST_FAILURE = '[Artist] Update Artist Failure',
  DELETE_ARTIST = '[Artist] Delete Artist',
  DELETE_ARTIST_SUCCESS = '[Artist] Delete Artist Success',
  DELETE_ARTIST_FAILURE = '[Artist] Delete Artist Failure',
}

export const loadArtists = createAction(ArtistActionTypes.LOAD_ARTISTS);

export const loadArtistsSuccess = createAction(
  ArtistActionTypes.LOAD_ARTISTS_SUCCESS,
  props<{ artists: Artist[] }>()
);

export const loadArtistsFailure = createAction(
  ArtistActionTypes.LOAD_ARTISTS_FAILURE,
  props<{ error: any }>()
);

export const loadArtist = createAction(
  ArtistActionTypes.LOAD_ARTIST,
  props<{ id: number }>()
);

export const loadArtistSuccess = createAction(
  ArtistActionTypes.LOAD_ARTIST_SUCCESS,
  props<{ artist: Artist }>()
);

export const loadArtistFailure = createAction(
  ArtistActionTypes.LOAD_ARTIST_FAILURE,
  props<{ error: any }>()
);

export const addArtist = createAction(
  ArtistActionTypes.ADD_ARTIST,
  props<{ artist: Artist }>()
);

export const addArtistSuccess = createAction(
  ArtistActionTypes.ADD_ARTIST_SUCCESS,
  props<{ artist: Artist }>()
);

export const addArtistFailure = createAction(
  ArtistActionTypes.ADD_ARTIST_FAILURE,
  props<{ error: any }>()
);

export const updateArtist = createAction(
  ArtistActionTypes.UPDATE_ARTIST,
  props<{ artist: Artist }>()
);

export const updateArtistSuccess = createAction(
  ArtistActionTypes.UPDATE_ARTIST_SUCCESS,
  props<{ artist: Artist }>()
);

export const updateArtistFailure = createAction(
  ArtistActionTypes.UPDATE_ARTIST_FAILURE,
  props<{ error: any }>()
);

export const deleteArtist = createAction(
  ArtistActionTypes.DELETE_ARTIST,
  props<{ id: number }>()
);

export const deleteArtistSuccess = createAction(
  ArtistActionTypes.DELETE_ARTIST_SUCCESS,
  props<{ id: number }>()
);

export const deleteArtistFailure = createAction(
  ArtistActionTypes.DELETE_ARTIST_FAILURE,
  props<{ error: any }>()
);
