import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer2,
  ChangeDetectorRef,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, filter, map, of, switchMap, take } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Artist } from 'src/app/artists/interfaces/artist.interface';
import { environment } from 'src/environments/environment';
import * as ArtistActions from '../../../artists/store/actions/artist.actions';
import * as fromArtistSelectors from '../../../artists/store/selectors/artist.selectors';
import * as SongActions from 'src/app/songs/store/actions/song.actions';
import * as fromSongSelectors from 'src/app/songs/store/selectors/song.selectors';
import { Song } from '../../interfaces/song.interface';
import * as UiActions from '../../../shared/store/actions/ui.actions';

@Component({
  selector: 'song-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent implements OnInit {
  artists$!: Observable<Artist[]>;
  availableGenres = environment.ALL_GENRES;
  countries = environment.countries;
  currentSongId: number | null = null;
  currentYear = new Date().getFullYear();
  editMode = false;
  form!: FormGroup;
  imgUrl: string = '';
  isDeleteAction = false;
  loading$!: Observable<boolean>;
  selectedArtists: number[] = [];
  selectedCountry: string | null = null;
  selectedGenres: string[] = [];
  showArtistDropdown: boolean = false;
  showDropdown = false;
  showGenreDropdown: boolean = false;
  submitted = false;

  @ViewChild('artistDropdown') artistDropdown!: ElementRef<HTMLDivElement>;
  @ViewChild('genreDropdown') genreDropdown!: ElementRef<HTMLDivElement>;
  @ViewChild('countryDropdown') countryDropdown!: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadArtists();
    this.checkEditMode();
    this.setupClickOutsideListener();
    this.imgUrl = this.checkSongImage();
  }
  checkSongImage(): string {
    const imgUrl =
      this.form.value.poster ||
      `http://dummyimage.com/400x600.png/${this.generateRandomHexColor()}/${this.generateRandomHexColor()}`;
    return imgUrl;
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: this.fb.array([], this.minArrayLength(1)),
      genre: this.fb.array([], this.minArrayLength(1)),
      year: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.currentYear),
        ],
      ],
      rating: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      duration: [
        null,
        [Validators.required, Validators.min(0), Validators.max(1000)],
      ],
      country: ['', Validators.required],
      poster: [''],
    });
  }

  minArrayLength(min: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: any } | null => {
      if (c.value.length >= min) {
        return null;
      }
      return { minArrayLength: { valid: false } };
    };
  }

  private loadArtists(): void {
    this.store.dispatch(ArtistActions.loadArtists());
    this.artists$ = this.store.pipe(
      select(fromArtistSelectors.selectAllArtists)
    );
  }

  private checkEditMode(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (id) {
            this.editMode = true;
            this.currentSongId = +id;
            this.store.dispatch(SongActions.loadSong({ id: +id }));
            return this.store.pipe(
              select(fromSongSelectors.selectCurrentSong, { id: +id })
            );
          }
          return of(null);
        }),
        filter((song) => song !== null) // Asegúrate de que la canción no sea null
      )
      .subscribe((song) => {
        if (song) {
          this.setFormValues(song);
        }
      });
  }

  setSelectedGenres(genres: string[]): void {
    const genreArray = this.form.get('genre') as FormArray;
    genreArray.clear();
    genres.forEach((genre) => {
      genreArray.push(this.fb.control(genre));
    });
    this.selectedGenres = genres;
  }

  setSelectedArtists(artists: number[] | number): void {
    const artistArray = this.form.get('artist') as FormArray;
    artistArray.clear();
    this.selectedArtists = [];

    const artistIds = Array.isArray(artists) ? artists : [artists];
    artistIds.forEach((artistId) => {
      artistArray.push(this.fb.control(artistId));
      this.selectedArtists.push(artistId);
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.valid) {
      const formData = this.form.value;

      let songData: Song = {
        ...formData,
        artist: this.selectedArtists,
        genre: this.selectedGenres,
      };

      if (this.editMode && this.currentSongId) {
        songData = { ...songData, id: this.currentSongId };
        this.updateSong(songData);
      } else {
        this.addSong(songData);
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  private setFormValues(song: Song): void {
    this.form.patchValue({
      title: song.title,
      year: song.year,
      rating: song.rating,
      duration: song.duration,
      country: song.country,
      poster: song.poster,
    });

    this.selectedGenres = [...song.genre];
    const genreArray = this.form.get('genre') as FormArray;
    genreArray.clear();
    this.selectedGenres.forEach((genre) => {
      genreArray.push(this.fb.control(genre));
    });

    this.selectedArtists = Array.isArray(song.artist)
      ? song.artist
      : [song.artist];
    const artistArray = this.form.get('artist') as FormArray;
    artistArray.clear();
    this.selectedArtists.forEach((artistId) => {
      artistArray.push(this.fb.control(artistId));
    });
  }

  onDelete(): void {
    this.isDeleteAction = true;
    this.onSubmit();
  }

  addSong(songData: Song): void {
    this.store.dispatch(SongActions.addSong({ song: songData }));

    this.store
      .pipe(
        select(fromSongSelectors.selectLastAddedSongId),
        filter((id) => id != null),
        take(1)
      )
      .subscribe((newSongId) => {
        this.store.dispatch(SongActions.loadingComplete()); // Detiene la carga
        this.showAddSongSuccessModal(newSongId!);
      });
  }

  showAddSongSuccessModal(newSongId: number): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Canción Añadida',
        message: 'La canción ha sido añadida exitosamente.',
        closable: false,
        confirmCallback: () => this.router.navigate(['/songs', newSongId]),
      })
    );
  }

  updateSong(songData: Song): void {
    this.store.dispatch(SongActions.updateSong({ song: songData }));

    this.store.pipe(
      select(fromSongSelectors.selectSongUpdateSuccess),
      filter(isUpdated => isUpdated),
      take(1)
    ).subscribe(() => {
      // Mostrar modal de confirmación
      this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
      this.showUpdateSongSuccessModal();
    });
  }

  showUpdateSongSuccessModal(): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Actualización Exitosa',
        message: 'La canción ha sido actualizada correctamente.',
        closable: true,
        confirmCallback: () => {
          this.store.dispatch(UiActions.hideModal());
          this.navigateBack();
        },
      })
    );
  }

  confirmDelete(songData: Song): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que quieres eliminar esta canción?',
        closable: true,
        confirmCallback: () => this.deleteSong(songData.id!),
      })
    );
  }

  deleteSong(id: number): void {
    this.store.dispatch(SongActions.deleteSong({ id }));
    this.store
      .pipe(
        select(fromSongSelectors.isSongDeleted),
        filter((isDeleted) => isDeleted),
        take(1)
      )
      .subscribe(() => {
        this.store.dispatch(UiActions.stopLoading());
        this.showSuccessModal();
      });
  }

  showSuccessModal(): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Eliminación Completada',
        message: 'La canción ha sido eliminada correctamente.',
        closable: false,
        confirmCallback: () => {
          this.store.dispatch(UiActions.hideModal());
          this.navigateBack();
        },
      })
    );
  }

  navigateBack(): void {
    this.store.dispatch(UiActions.hideModal());
    this.location.back();
  }

  /* Styles methods */

  generateRandomHexColor(): string {
    return Math.floor(Math.random() * 16777215).toString(16);
  }

  getArtistName(artistId: number): Observable<string> {
    return this.artists$.pipe(
      map(
        (artists) =>
          artists.find((artist) => artist.id === artistId)?.name || ''
      )
    );
  }

  onArtistDropdownBlur(): void {
    if (this.selectedArtists.length === 0) {
      this.form.get('artist')?.markAsTouched();
    }
  }

  onGenreDropdownBlur(): void {
    if (this.selectedGenres.length === 0) {
      this.form.get('genre')?.markAsTouched();
    }
  }

  private setupClickOutsideListener() {
    this.renderer.listen('window', 'click', (event: Event) => {
      const clickedElement = event.target as HTMLElement;

      if (
        this.artistDropdown &&
        !this.artistDropdown.nativeElement.contains(clickedElement)
      ) {
        this.showArtistDropdown = false;
      }
      if (
        this.genreDropdown &&
        !this.genreDropdown.nativeElement.contains(clickedElement)
      ) {
        this.showGenreDropdown = false;
      }
      if (
        this.countryDropdown &&
        !this.countryDropdown.nativeElement.contains(clickedElement)
      ) {
        this.showDropdown = false;
      }
    });
  }

  toggleDropdown(type: string) {
    if (type === 'artist') {
      this.showArtistDropdown = !this.showArtistDropdown;
    } else if (type === 'genre') {
      this.showGenreDropdown = !this.showGenreDropdown;
    } else if (type === 'country') {
      this.showDropdown = !this.showDropdown;
    }
  }

  selectCountry(country: string) {
    this.selectedCountry = country;
    this.form.get('country')?.setValue(country);
    this.showDropdown = false;
  }

  private updateArtistsFormArray(): void {
    const artistArray = this.form.get('artist') as FormArray;
    artistArray.clear();
    this.selectedArtists.forEach((artistId) => {
      artistArray.push(this.fb.control(artistId));
    });
  }

  addSelectedArtist(artistId: number) {
    const artistArray = this.form.get('artist') as FormArray;
    if (!artistArray.value.includes(artistId)) {
      artistArray.push(this.fb.control(artistId));
      this.selectedArtists.push(artistId);
    }
  }

  addSelectedGenre(genre: string) {
    const genreArray = this.form.get('genre') as FormArray;
    if (!genreArray.value.includes(genre)) {
      genreArray.push(this.fb.control(genre));
      this.selectedGenres.push(genre);
    }
  }

  getArtistIds(): number[] {
    return Array.isArray(this.form.value.artist)
      ? this.form.value.artist
      : [this.form.value.artist];
  }

  getGenreValues(): string[] {
    return this.form.value.genre;
  }

  toggleGenreDropdown() {
    this.showGenreDropdown = !this.showGenreDropdown;

    if (!this.showGenreDropdown) {
      this.forceGenreValidation();
    }
  }

  forceGenreValidation() {
    const genreArray = this.form.get('genre') as FormArray;

    if (this.selectedGenres.length === 0) {
      genreArray.setValidators(Validators.required);
      genreArray.markAsTouched();
    } else {
      genreArray.clearValidators();
    }
    genreArray.updateValueAndValidity();
  }

  selectGenre(genre: string): void {
    if (this.selectedGenres.includes(genre)) {
      this.removeSelectedGenre(genre);
    } else {
      this.selectedGenres.push(genre);
      this.updateGenresFormArray();
    }
    this.forceGenreValidation();
  }

  removeSelectedGenre(genre: string): void {
    this.selectedGenres = this.selectedGenres.filter((g) => g !== genre);
    this.updateGenresFormArray();
    this.forceGenreValidation();
  }

  private updateGenresFormArray(): void {
    const genreArray = this.form.get('genre') as FormArray;
    genreArray.clear();
    this.selectedGenres.forEach((genre) => {
      genreArray.push(this.fb.control(genre));
    });
  }

  toggleArtistDropdown() {
    this.showArtistDropdown = !this.showArtistDropdown;

    if (!this.showArtistDropdown) {
      const artistArray = this.form.get('artist') as FormArray;
      if (artistArray.length === 0) {
        artistArray.setValidators(Validators.minLength(1));
      } else {
        artistArray.clearValidators();
      }
      artistArray.updateValueAndValidity();
      this.cdr.detectChanges(); // Forzar la actualización de la vista
    }
  }

  selectArtist(artistId: number): void {
    const artistArray = this.form.get('artist') as FormArray;

    if (this.selectedArtists.includes(artistId)) {
      this.removeSelectedArtist(artistId);
    } else {
      this.selectedArtists.push(artistId);
      artistArray.push(this.fb.control(artistId));
    }

    this.updateArtistsValidation(); // Actualizar validación
  }

  removeSelectedArtist(artistId: number): void {
    this.selectedArtists = this.selectedArtists.filter((id) => id !== artistId);
    this.updateArtistsFormArray();

    // Forzar la validación cada vez que se modifica la lista de artistas
    const artistArray = this.form.get('artist') as FormArray;
    if (this.selectedArtists.length === 0) {
      artistArray.setValidators(Validators.required);
    } else {
      artistArray.clearValidators();
    }
    artistArray.updateValueAndValidity();
  }

  private updateArtistsValidation(): void {
    const artistArray = this.form.get('artist') as FormArray;
    if (this.selectedArtists.length === 0) {
      artistArray.setValidators(Validators.minLength(1));
    } else {
      artistArray.clearValidators();
    }
    artistArray.updateValueAndValidity();
  }
}
