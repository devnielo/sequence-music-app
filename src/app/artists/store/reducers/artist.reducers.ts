import { createReducer, on } from '@ngrx/store';
import * as ArtistActions from '../actions/artist.actions';
import { Artist } from '../../interfaces/artist.interface';

export interface ArtistState {
  artists: Artist[];
  currentArtist: Artist | null;
  loading: boolean;
  error: any;
}

export const initialState: ArtistState = {
  artists: [],
  currentArtist: null,
  loading: false,
  error: null
};

export const artistReducer = createReducer(
  initialState,
  // Cargar todos los artistas
  on(ArtistActions.loadArtists, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArtistActions.loadArtistsSuccess, (state, { artists }) => ({
    ...state,
    loading: false,
    artists: artists,
    error: null
  })),
  on(ArtistActions.loadArtistsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  // Cargar un artista específico
  on(ArtistActions.loadArtist, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArtistActions.loadArtistSuccess, (state, { artist }) => ({
    ...state,
    currentArtist: artist,
    loading: false,
    error: null
  })),
  on(ArtistActions.loadArtistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  // Agregar un nuevo artista
  on(ArtistActions.addArtist, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArtistActions.addArtistSuccess, (state, { artist }) => ({
    ...state,
    artists: [...state.artists, artist],
    loading: false,
    error: null
  })),
  on(ArtistActions.addArtistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  // Actualizar un artista existente
  on(ArtistActions.updateArtist, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArtistActions.updateArtistSuccess, (state, { artist }) => ({
    ...state,
    artists: state.artists.map(a => a.id === artist.id ? artist : a),
    loading: false,
    error: null
  })),
  on(ArtistActions.updateArtistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  // Eliminar un artista
  on(ArtistActions.deleteArtist, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ArtistActions.deleteArtistSuccess, (state, { id }) => ({
    ...state,
    artists: state.artists.filter(a => a.id !== id),
    loading: false,
    error: null
  })),
  on(ArtistActions.deleteArtistFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  }))
);
