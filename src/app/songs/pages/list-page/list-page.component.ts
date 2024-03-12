import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as SongActions from '../../store/actions/song.actions';
import * as ArtistActions from '../../../artists/store/actions/artist.actions';
import * as fromArtistSelectors from '../../../artists/store/selectors/artist.selectors';
import * as fromSongSelectors from '../../store/selectors/song.selectors';
import { Song } from '../../interfaces/song.interface';
import { SongService } from '../../services/songs.service';
import { ArtistService } from 'src/app/artists/services/artists.service';
import { selectAllArtists } from '../../../artists/store/selectors/artist.selectors';
import { Artist } from 'src/app/artists/interfaces/artist.interface';

@Component({
  selector: 'song-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  songs$: Observable<Song[]>; // Observable para canciones del store
  songsWithArtistNames$!: Observable<Song[]>; // Observable para canciones con nombres de artistas
  loading$: Observable<boolean>;
  searchControl = new FormControl('');
  artistNamesBySongId: { [songId: number]: string } = {};
  allDataLoaded$!: Observable<boolean>;

  constructor(
    private store: Store,
    private router: Router,
    private songService: SongService
  ) {
    this.songs$ = this.store.select(fromSongSelectors.selectAllSongs);
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
    console.log(this.songsWithArtistNames$);
  }

  ngOnInit(): void {
    this.store.dispatch(SongActions.loadSongs());
    this.store.dispatch(ArtistActions.loadArtists()); // Asegúrate de que se carguen los artistas

    this.allDataLoaded$ = combineLatest([
      this.store.pipe(select(fromSongSelectors.selectSongsLoading)),
      this.store.pipe(select(fromArtistSelectors.selectArtistsLoading)),
    ]).pipe(
      map(([songsLoading, artistsLoading]) => !songsLoading && !artistsLoading)
    );

    this.songsWithArtistNames$ = this.allDataLoaded$.pipe(
      filter((allLoaded) => allLoaded), // Procesar solo cuando todo esté cargado
      switchMap(() =>
        this.store.pipe(select(fromSongSelectors.selectAllSongs))
      ),
      switchMap((songs) =>
        forkJoin({
          songs: of(songs),
          artists: this.store.pipe(select(selectAllArtists)),
        })
      ),
      map(({ songs, artists }) => {
        return songs.map((song) => {
          const artistNames = this.mapArtistIdsToNames(
            artists,
            this.ensureArray(song.artist)
          );
          return { ...song, artistNames };
        });
      })
    );
  }

  private loadSongsWithArtistNames(): void {
    this.store.dispatch(SongActions.loadSongs());

    this.songsWithArtistNames$ = this.store.pipe(
      select(fromSongSelectors.selectAllSongs),
      switchMap((songs) =>
        forkJoin({
          songs: of(songs),
          artists: this.store.pipe(select(selectAllArtists)),
        })
      ),
      map(({ songs, artists }) => {
        return songs.map((song) => {
          const artistNames = this.mapArtistIdsToNames(
            artists,
            this.ensureArray(song.artist)
          );
          return { ...song, artistNames };
        });
      })
    );
  }

  private mapArtistIdsToNames(artists: Artist[], artistIds: number[]): string {
    return artistIds
      .map((id) => artists.find((artist) => artist.id === id)?.name || '')
      .filter((name) => name)
      .join(', ');
  }

  private handleSearchQuery(query: string | null): Observable<Song[]> {
    if (query && query.length > 1) {
      return this.songService.searchSongs(query);
    } else {
      return this.songs$;
    }
  }

  getArtistNames(artistIds: number[]): Observable<string> {
    console.log(artistIds);

    return this.store.pipe(
      select(selectAllArtists),
      map((artists) => this.mapArtistIdsToNames(artists, artistIds))
    );
  }

  private ensureArray(artistData: number | number[]): number[] {
    return Array.isArray(artistData) ? artistData : [artistData];
  }

  private getAllArtistIds(songs: Song[]): number[] {
    return Array.from(new Set(songs.flatMap((song) => song.artist)));
  }

  navigateToDetails(songId: number): void {
    this.router.navigate(['/songs', songId]);
  }
}
