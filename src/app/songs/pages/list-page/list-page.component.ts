import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Song } from '../../interfaces/song.interface';
import { Router } from '@angular/router';
import { loadSongs } from '../../store/actions/song.actions';
import {
  selectAllSongs,
  selectSongsLoading,
} from '../../store/selectors/song.selectors';
import { SongState } from '../../store/reducers/song.reducer';

@Component({
  selector: 'song-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css'],
})
export class ListPageComponent implements OnInit {
  songs$: Observable<Song[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store<SongState>, private router: Router) {
    this.loading$ = this.store.select(selectSongsLoading);
    this.songs$ = this.store.select(selectAllSongs);
  }

  ngOnInit(): void {
    this.store.dispatch(loadSongs()); // Iniciar la carga de las canciones
  }

  navigateToDetails(songId: number): void {
    this.router.navigate(['/songs', songId]); // Navegar a los detalles de la canción
  }

  navigateToEdit(songId: number): void {
    this.router.navigate(['/songs/edit', songId]); // Navegar a la edición de la canción
  }

  navigateToAdd() {
    this.router.navigate(['/songs/add']); // Navegar a la edición de la canción
  }
}
