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
import { Song } from '../../interfaces/song.interface';
import { SongService } from '../../services/songs.service';
import { ArtistService } from 'src/app/artists/services/artists.service';
import { selectAllArtists } from '../../../artists/store/selectors/artist.selectors';
import { Artist } from 'src/app/artists/interfaces/artist.interface';
import * as fromSongSelectors from '../../store/selectors/song.selectors';

@Component({
  selector: 'song-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
getArtists() {
throw new Error('Method not implemented.');
}
  songs$: Observable<Song[]>;
  songsWithArtistNames$!: Observable<Song[]>;
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
  }

  ngOnInit(): void {
    this.store.dispatch(SongActions.loadSongs());
    //this.store.dispatch(SongActions.loadSongsWithArtists());
  }

  private handleSearchQuery(query: string | null): Observable<Song[]> {
    if (query && query.length >= 1) {
      return this.songService.searchSongs(query);
    } else {
      return this.songs$;
    }
  }

  navigateToDetails(songId: number): void {
    this.router.navigate(['/songs', songId]);
  }
}
