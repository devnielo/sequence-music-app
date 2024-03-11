// loader.component.ts
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectSongsLoading } from 'src/app/songs/store/selectors/song.selectors';
import { SongState } from 'src/app/songs/store/reducers/song.reducer';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  loading$!: Observable<boolean>;

  constructor(private store: Store<SongState>) {}

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectSongsLoading));
  }
}
