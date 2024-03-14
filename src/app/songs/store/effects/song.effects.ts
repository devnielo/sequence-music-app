import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  distinct,
  finalize,
  map,
  mergeMap,
  switchMap,
  tap,
} from 'rxjs/operators';
import { firstValueFrom, forkJoin, of } from 'rxjs';
import * as SongActions from '../actions/song.actions';
import { SongService } from '../../services/songs.service';
import { Store } from '@ngrx/store';
import { SongState } from '../reducers/song.reducer';
import { ArtistService } from 'src/app/artists/services/artists.service';
import * as ArtistActions from '../../../artists/store/actions/artist.actions';
import { Song, SongWithArtists } from '../../interfaces/song.interface';
import { ApiResponse } from 'src/app/core/models/api-response.model';

@Injectable()
export class SongEffects {
  constructor(
    private actions$: Actions,
    private songService: SongService,
    private store: Store<SongState>,
    private artistService: ArtistService
  ) {}

  /* loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongs),
      tap(() => this.store.dispatch(SongActions.loadingStart())),
      switchMap(() =>
        this.songService.getAllSongs().pipe(
          switchMap((response) => {
            const songs = response.data;
            const artistRequests = songs.map((song) =>
              Array.isArray(song.artist)
                ? forkJoin(
                    song.artist.map((artistId) =>
                      this.artistService.getArtistById(artistId)
                    )
                  )
                : this.artistService
                    .getArtistById(song.artist)
                    .pipe(map((artist) => [artist]))
            );
            return forkJoin(artistRequests).pipe(
              map((artistsDetailsArrays) =>
                songs.map((song, index) => ({
                  ...song,
                  artistDetails: artistsDetailsArrays[index].filter(Boolean),
                }))
              )
            );
          }),
          map((songsWithArtists) =>
            SongActions.loadSongsSuccess({ songs: songsWithArtists })
          ),
          catchError((error) => of(SongActions.loadSongsFailure({ error })))
        )
      ),
      catchError((error) => of(SongActions.loadSongsFailure({ error }))),
      finalize(() => this.store.dispatch(SongActions.loadingComplete()))
    )
  ); */

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSongs),
      tap(() => this.store.dispatch(SongActions.loadingStart())),
      mergeMap(() =>
        this.songService.getAllSongs().pipe(
          map((apiResponse: ApiResponse<Song[]>) => {
            const songs = apiResponse?.data || apiResponse; // Acceder a las canciones, si existen
            return songs;
          }),
          switchMap((songs: Song[]) => {
            // Procesar las canciones para obtener detalles de artistas
            const songObservables = songs.map((song) => {
              if (Array.isArray(song.artist)) {
                // Procesamiento cuando 'artist' es un array
                const artistObservables = song.artist.map((artistId) =>
                  this.artistService.getArtistById(artistId).pipe(
                    catchError(() => of(undefined)) // Manejo de errores
                  )
                );
                return forkJoin(artistObservables).pipe(
                  map((artistsDetails) => ({
                    ...song,
                    artistsDetails: artistsDetails.filter((details) => details),
                  }))
                );
              } else {
                // Procesamiento cuando 'artist' es un único ID
                return this.artistService.getArtistById(song.artist).pipe(
                  map((artistDetails) => ({
                    ...song,
                    artistDetails,
                  })),
                  catchError(() => of({ ...song, artistDetails: undefined })) // Manejo de errores
                );
              }
            });
            return forkJoin(songObservables);
          }),
          map((songsWithArtists) => {
            return SongActions.loadSongsSuccess({ songs: songsWithArtists });
          }),
          catchError((error) => of(SongActions.loadSongsFailure({ error }))) // Manejo de errores
        )
      )
    )
  );

  loadSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.loadSong),
      tap(() => this.store.dispatch(SongActions.loadingStart())), // Dispara la acción de inicio de carga
      mergeMap(async (action) => {
        try {
          const response = await firstValueFrom(
            this.songService.getSongById(action.id)
          );
          const song: any = response;
          return SongActions.loadSongSuccess({ song });
        } catch (error) {
          return SongActions.loadSongFailure({ error });
        }
      })
    )
  );

  addSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.addSong),
      tap(() => this.store.dispatch(SongActions.loadingStart())),
      mergeMap((action) =>
        this.songService.addSong(action.song).pipe(
          map((song) => {
            const data: any = song;
            return SongActions.addSongSuccess({ song: data });
          }),
          catchError((error) => of(SongActions.addSongFailure({ error })))
        )
      )
    )
  );

  updateSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.updateSong),
      tap(() => {
        this.store.dispatch(SongActions.loadingStart());
      }),
      mergeMap(async (action) => {

        try {
          const response = await this.songService.updateSong(action.song);
          const song: any = response;
          return SongActions.updateSongSuccess({ song });
        } catch (error) {
          console.error('Error en la actualización de la canción', error);
          return SongActions.updateSongFailure({ error });
        }
      })
    )
  );

  deleteSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongActions.deleteSong),
      mergeMap((action) =>
        this.songService.deleteSong(action.id).pipe(
          map(() => SongActions.deleteSongSuccess({ id: action.id })),
          catchError((error) => of(SongActions.deleteSongFailure({ error })))
        )
      )
    )
  );
}
