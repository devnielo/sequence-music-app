import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ArtistActions from '../actions/artist.actions';
import { ArtistService } from '../../services/artists.service';

@Injectable()
export class ArtistEffects {
  loadArtists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.loadArtists),
      mergeMap(() =>
        this.artistService.getAllArtists().pipe(
          map((response) => {
            const artists: any = response;
            return ArtistActions.loadArtistsSuccess({ artists });
          }),
          catchError((error) => of(ArtistActions.loadArtistsFailure({ error })))
        )
      )
    )
  );

  loadArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.loadArtist),
      mergeMap((action) =>
        this.artistService.getArtistById(action.id).pipe(
          map((response) => {
            const artist: any = response;
            return ArtistActions.loadArtistSuccess({ artist });
          }),
          catchError((error) => of(ArtistActions.loadArtistFailure({ error })))
        )
      )
    )
  );

  addArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.addArtist),
      mergeMap((action) =>
        this.artistService.addArtist(action.artist).pipe(
          map((response) => {
            const artist: any = response;
            return ArtistActions.addArtistSuccess({ artist });
          }),
          catchError((error) => of(ArtistActions.addArtistFailure({ error })))
        )
      )
    )
  );

  updateArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.updateArtist),
      mergeMap((action) =>
        this.artistService.updateArtist(action.artist).pipe(
          map((response) => {
            const artist: any = response;
            return ArtistActions.updateArtistSuccess({ artist });
          }),
          catchError((error) => of(ArtistActions.updateArtistFailure({ error })))
        )
      )
    )
  );

  deleteArtist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ArtistActions.deleteArtist),
      mergeMap((action) =>
        this.artistService.deleteArtist(action.id).pipe(
          map(() => ArtistActions.deleteArtistSuccess({ id: action.id })),
          catchError((error) => of(ArtistActions.deleteArtistFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private artistService: ArtistService) {}
}
