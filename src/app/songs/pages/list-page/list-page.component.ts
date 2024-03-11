import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as SongActions from '../../store/actions/song.actions';
import * as fromSongSelectors from '../../store/selectors/song.selectors';
import { Song } from '../../interfaces/song.interface';
import { SongService } from '../../services/songs.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  songs$: Observable<Song[]>;
  loading$: Observable<boolean>;
  searchControl = new FormControl('');

  constructor(
    private store: Store,
    private router: Router,
    private songService: SongService
  ) {
    this.songs$ = this.store.select(fromSongSelectors.selectAllSongs);
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
  }

  ngOnInit(): void {
    // Inicia la carga de las canciones
    this.store.dispatch(SongActions.loadSongs());

    // Observable para las canciones del store
    this.songs$ = this.store.select(fromSongSelectors.selectAllSongs);

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query && query.length > 1) {
            // Si hay más de 1 carácter, busca las canciones
            return this.songService.searchSongs(query);
          } else {
            // Si hay 1 carácter o menos, retorna las canciones del store
            return this.songs$;
          }
        })
      )
      .subscribe((songs) => {
        this.songs$ = of(songs);
      });
  }

  navigateToDetails(songId: number): void {
    this.router.navigate(['/songs', songId]);
  }
}
