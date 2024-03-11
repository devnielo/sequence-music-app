import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, map, of, switchMap } from 'rxjs';

import { Artist } from 'src/app/artists/interfaces/artist.interface';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

import * as ArtistActions from '../../../artists/store/actions/artist.actions';
import * as fromArtistSelectors from '../../../artists/store/selectors/artist.selectors';
import * as SongActions from 'src/app/songs/store/actions/song.actions';
import * as fromSongSelectors from 'src/app/songs/store/selectors/song.selectors';
import { Song } from '../../interfaces/song.interface';

@Component({
  selector: 'song-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
})
export class FormPageComponent implements OnInit {
  form!: FormGroup;
  artists$!: Observable<Artist[]>;
  editMode = false;
  currentSongId: number | null = null;
  availableGenres = environment.ALL_GENRES;
  selectedGenres: string[] = [];
  showGenreDropdown: boolean = false;
  selectedArtists: number[] = [];
  showArtistDropdown: boolean = false;
  loading$!: Observable<boolean>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkEditMode();
    this.loading$ = this.store.pipe(select(fromSongSelectors.selectSongsLoading));
    this.initForm();
    this.store.dispatch(ArtistActions.loadArtists());
    this.artists$ = this.store.pipe(select(fromArtistSelectors.selectAllArtists));
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: [null, Validators.required],
      genres: [this.selectedGenres, Validators.required],
      year: [null, Validators.required],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      poster: [''],
    });
  }

  private checkEditMode(): void {
    this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        if (id) {
          this.editMode = true;
          this.currentSongId = +id;
          this.store.dispatch(SongActions.loadSong({ id: +id }));
          return this.store.pipe(select(fromSongSelectors.selectCurrentSong, { id: +id }));
        }
        return of(null);
      })
    ).subscribe((song) => {
      if (song) {
        this.setFormValues(song);
      }
    });
  }

  private setFormValues(song: Song): void {
    this.form.patchValue(song);

    // Configura los géneros seleccionados
    if (Array.isArray(song.genre)) {
      this.selectedGenres = song.genre;
    } else {
      this.selectedGenres = song.genre ? [song.genre] : [];
    }

    // Configura los artistas seleccionados
    if (Array.isArray(song.artist)) {
      this.selectedArtists = song.artist;
    } else {
      this.selectedArtists = song.artist ? [song.artist] : [];
    }
  }



  onSubmit(): void {
    if (this.form.valid && this.selectedGenres.length > 0) {
      const posterUrl = this.form.value.poster || `http://dummyimage.com/400x600.png/${this.generateRandomHexColor()}/000000`;
      const songData: Song = {
        ...this.form.value,
        artist: this.selectedArtists,
        genre: this.selectedGenres,
        poster: posterUrl,
        id: this.currentSongId
      };
      if (this.editMode) {
        this.store.dispatch(SongActions.updateSong({ song: songData }));
      } else {
        this.store.dispatch(SongActions.addSong({ song: songData }));
      }
      this.router.navigate(['/songs']);
    }
  }

  toggleGenreDropdown() {
    this.showGenreDropdown = !this.showGenreDropdown;
  }

  addSelectedGenre(genre: string) {
    this.selectedGenres.push(genre);
    this.toggleGenreDropdown();
  }

  removeSelectedGenre(genre: string) {
    this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
  }

  addSelectedArtist(artistId: number) {
    this.selectedArtists.push(artistId);
    this.toggleArtistDropdown();
  }

  removeSelectedArtist(artistId: number) {
    this.selectedArtists = this.selectedArtists.filter((id) => id !== artistId);
  }

  toggleArtistDropdown() {
    this.showArtistDropdown = !this.showArtistDropdown;
  }

  generateRandomHexColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  getArtistName(artistId: number): Observable<string> {
    return this.artists$.pipe(
      map((artists) => artists.find((artist) => artist.id === artistId)?.name || '')
      );
    }

  onCancel(): void {
    this.router.navigate(['/songs']);
  }
}
