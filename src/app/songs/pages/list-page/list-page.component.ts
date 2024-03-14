import { Component, OnInit } from '@angular/core';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import * as SongActions from '../../store/actions/song.actions';
import * as fromSongSelectors from '../../store/selectors/song.selectors';
import { Song } from '../../interfaces/song.interface';
import { FormControl } from '@angular/forms';
import { Artist } from 'src/app/artists/interfaces/artist.interface';
import { ApiService } from 'src/app/core/services/api.service';
import { SongService } from '../../services/songs.service';

@Component({
  selector: 'song-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  songs$: Observable<Song[]>;
  loading$: Observable<boolean>;
  searchControl = new FormControl('');
  artistNames: { [key: number]: string } = {};

  constructor(
    private store: Store,
    private router: Router,
    private apiService: ApiService,
    private songService: SongService
  ) {
    this.songs$ = this.store.pipe(select(fromSongSelectors.selectAllSongs));
    this.loading$ = this.store.pipe(
      select(fromSongSelectors.selectSongsLoading)
    );
  }

  ngOnInit(): void {
    this.store.dispatch(SongActions.loadSongs());
    this.songs$.subscribe((songs) => {
      songs.forEach((song) => {
        this.loadArtistNames(song.artist);
      });
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => this.handleSearchQuery(query))
      )
      .subscribe((songs) => {
        this.songs$ = of(songs);
      });
  }

  loadSongs(): void {
    this.store.dispatch(SongActions.loadSongs());
  }

  private loadArtistNames(artistIds: number | number[]): void {
    if (Array.isArray(artistIds)) {
      artistIds.forEach((artistId) => this.loadArtistName(artistId));
    } else {
      this.loadArtistName(artistIds);
    }
  }

  private loadArtistName(artistId: number): void {
    this.getArtistNameById(artistId).subscribe((name) => {
      this.artistNames[artistId] = name;
    });
  }

  getArtistNames(artistIds: number | number[]): string {
    if (Array.isArray(artistIds)) {
      return artistIds
        .map((id) => this.artistNames[id])
        .filter((name) => !!name)
        .join(', ');
    } else {
      return this.artistNames[artistIds] || '';
    }
  }

  private getArtistNameById(artistId: number): Observable<string> {
    return this.apiService.get<Artist>(`artists/${artistId}`).pipe(
      map((response: any) => response.name),
      catchError(() => of('Unknown Artist'))
    );
  }

  handleSearchQuery(query: string | null): Observable<Song[]> {
    if (query && query.length > 0) {
      return this.songService.searchSongs(query);
    } else {
      return this.songs$ = this.store.pipe(select(fromSongSelectors.selectAllSongs));
    }
  }

  navigateToDetails(songId: number): void {
    this.router.navigate(['/songs', songId]);
  }
}
