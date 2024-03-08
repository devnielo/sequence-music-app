import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectAllSongs,
  selectSongsLoading,
} from '../../store/selectors/song.selectors';
import { loadSongs } from '../../store/actions/song.actions';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.css'],
})
export class SongListComponent implements OnInit {
  songs$ = this.store.select(selectAllSongs);
  loading$ = this.store.select(selectSongsLoading);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadSongs());
  }
}
