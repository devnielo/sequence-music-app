import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, map, of, switchMap } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Artist } from 'src/app/artists/interfaces/artist.interface';
import { environment } from 'src/environments/environment';
import * as ArtistActions from '../../../artists/store/actions/artist.actions';
import * as fromArtistSelectors from '../../../artists/store/selectors/artist.selectors';
import * as SongActions from 'src/app/songs/store/actions/song.actions';
import * as fromSongSelectors from 'src/app/songs/store/selectors/song.selectors';
import { Song } from '../../interfaces/song.interface';

@Component({
  selector: 'song-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent implements OnInit {
  form!: FormGroup;
  artists$!: Observable<Artist[]>;
  editMode = false;
  currentSongId: number | null = null;
  availableGenres = environment.ALL_GENRES;
  selectedGenres: string[] = [];
  showDropdown = false;
  loading$!: Observable<boolean>;
  countries = environment.countries;
  currentYear = new Date().getFullYear();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadArtists();
    this.checkEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: this.fb.array([], Validators.minLength(1)),
      genre: this.fb.array([], Validators.minLength(1)),
      year: [
        null,
        [Validators.required, Validators.min(0), Validators.max(this.currentYear)]
      ],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      duration: [null, [Validators.required, Validators.min(0), Validators.max(1000)]],
      country: ['', Validators.required],
      poster: ['']
    });
  }

  private loadArtists(): void {
    this.store.dispatch(ArtistActions.loadArtists());
    this.artists$ = this.store.pipe(select(fromArtistSelectors.selectAllArtists));
  }

  private checkEditMode(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.editMode = true;
          this.currentSongId = +id;
          this.store.dispatch(SongActions.loadSong({ id: +id }));
          return this.store.pipe(select(fromSongSelectors.selectCurrentSong, { id: +id }));
        }
        return of(null);
      })
    ).subscribe(song => {
      if (song) {
        this.setFormValues(song);
      }
    });
  }

  private setFormValues(song: Song): void {
    this.form.patchValue({
      title: song.title,
      year: song.year,
      rating: song.rating,
      duration: song.duration,
      country: song.country,
      poster: song.poster
    });
    this.setSelectedGenres(song.genre);
    this.setSelectedArtists(song.artist);
  }

  setSelectedGenres(genres: string | string[]): void {
    const genreArray = this.form.get('genre') as FormArray;
    genreArray.clear();
    if (Array.isArray(genres)) {
      genres.forEach(genre => genreArray.push(this.fb.control(genre)));
    } else if (genres) {
      genreArray.push(this.fb.control(genres));
    }
  }

  setSelectedArtists(artists: number | number[]): void {
    const artistArray = this.form.get('artist') as FormArray;
    artistArray.clear();
    if (Array.isArray(artists)) {
      artists.forEach(artist => artistArray.push(this.fb.control(artist)));
    } else if (artists) {
      artistArray.push(this.fb.control(artists));
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const songData: Song = {
        ...this.form.value,
        artist: this.getArtistIds(),
        genre: this.getGenreValues()
      };

      if (this.editMode) {
        // Update logic
      } else {
        // Add logic
      }

      this.router.navigate(['/songs']);
    } else {
      this.form.markAllAsTouched(); // Make sure all fields are touched to show validation errors
    }
  }

  getArtistIds(): number[] {
    return (this.form.get('artist') as FormArray).value;
  }

  getGenreValues(): string[] {
    return (this.form.get('genre') as FormArray).value;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectCountry(country: string): void {
    this.form.get('country')?.setValue(country);
    this.toggleDropdown();
  }

  onCancel(): void {
    this.location.back();
  }

  generateRandomHexColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
