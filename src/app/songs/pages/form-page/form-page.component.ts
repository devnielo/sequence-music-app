import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
import * as UiActions from '../../../shared/store/actions/ui.actions';

@Component({
  selector: 'song-form-page',
  templateUrl: './form-page.component.html',
})
export class FormPageComponent implements OnInit {
  form!: FormGroup;
  artists$!: Observable<Artist[]>;
  loading$!: Observable<boolean>;
  editMode = false;
  currentSongId: number | null = null;
  availableGenres = environment.ALL_GENRES;
  selectedGenres: string[] = [];
  showDropdown = false;
  countries = environment.countries;
  currentYear = new Date().getFullYear();
  showGenreDropdown: boolean = false;
  selectedArtists: number[] = [];
  showArtistDropdown: boolean = false;
  selectedCountry: string | null = null;
  isDeleteAction = false; // Propiedad para rastrear si es acción de eliminación

  @ViewChild('artistDropdown') artistDropdown!: ElementRef<HTMLDivElement>;
  @ViewChild('genreDropdown') genreDropdown!: ElementRef<HTMLDivElement>;
  @ViewChild('countryDropdown') countryDropdown!: ElementRef<HTMLDivElement>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private renderer: Renderer2
  ) {
    this.loading$ = this.store.select(fromSongSelectors.selectSongsLoading);
  }

  ngOnInit(): void {
    this.initForm();
    this.loadArtists();
    this.checkEditMode();
    this.setupClickOutsideListener();
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: this.fb.array([], Validators.minLength(1)),
      genre: this.fb.array([], Validators.minLength(1)),
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
        })
      )
      .subscribe((song) => {
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
      poster: song.poster,
    });
    this.setSelectedGenres(song.genre);
    this.setSelectedArtists(song.artist);
  }

  setSelectedGenres(genres: string[]): void {
    const genreArray = this.form.get('genre') as FormArray;
    genreArray.clear();
    genres.forEach((genre) => {
      genreArray.push(this.fb.control(genre));
    });
    this.selectedGenres = [...genres]; // Actualiza la lista de géneros seleccionados
    console.log(this.selectedGenres);
  }

  setSelectedArtists(artists: number | number[]): void {
    const artistArray = this.form.get('artist') as FormArray;
    artistArray.clear();
    this.selectedArtists = []; // Limpia la lista de artistas seleccionados

    if (Array.isArray(artists)) {
      // Si 'artists' es un arreglo, itera y añade cada id al form array y a la lista de seleccionados
      artists.forEach((id) => {
        artistArray.push(this.fb.control(id));
        this.selectedArtists.push(id);
      });
    } else if (typeof artists === 'number') {
      // Si 'artists' es un número, añade solo ese id
      artistArray.push(this.fb.control(artists));
      this.selectedArtists.push(artists);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      let songData: Song;

      if (this.editMode) {
        songData = {
          id: this.currentSongId,
          ...this.form.value,
          artist: this.getArtistIds(),
          genre: this.getGenreValues(),
        };
        if (this.isDeleteAction) {
          this.confirmDelete(songData);
        } else {
          this.updateSong(songData);
        }
      } else {
        songData = {
          ...this.form.value,
          artist: this.getArtistIds(),
          genre: this.getGenreValues(),
        };

        this.addSong(songData);
      }

      console.log(songData);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onDelete(): void {
    this.isDeleteAction = true;
    this.onSubmit();
  }

  addSong(songData: Song): void {
    this.store.dispatch(SongActions.addSong({ song: songData }));
    this.navigateBack();
  }

  updateSong(songData: Song): void {
    console.log(songData);

    this.store.dispatch(SongActions.updateSong({ song: songData }));
    this.navigateBack();
  }

  confirmDelete(songData: Song): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de que quieres eliminar esta canción?',
        confirmCallback: () => this.deleteSong(songData.id!),
      })
    );
  }

  deleteSong(id: number): void {
    console.log(id);
    this.store.dispatch(UiActions.startLoading());
    this.store.dispatch(SongActions.deleteSong({ id }));
    this.store.dispatch(UiActions.stopLoading());
    this.showSuccessModal();
  }

  showSuccessModal(): void {
    this.store.dispatch(
      UiActions.showModal({
        title: 'Eliminación Completada',
        message: 'La canción ha sido eliminada correctamente.',
        confirmCallback: () => {
          this.store.dispatch(UiActions.stopLoading());
          this.navigateBack();
        },
      })
    );
  }

  generaTeRandomImage(){
    const imgUrl = this.form.value.poster ||
    `http://dummyimage.com/400x600.png/${this.generateRandomHexColor()}/${this.generateRandomHexColor()}`;
    console.log(imgUrl);
    return imgUrl;
  }

  navigateBack(): void {
    this.store.dispatch(UiActions.hideModal());
    this.location.back();
  }

  /* Styles methods */

  getArtistIds(): number[] {
    return (this.form.get('artist') as FormArray).value;
  }

  getGenreValues(): string[] {
    return (this.form.get('genre') as FormArray).value;
  }

  generateRandomHexColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  getArtistName(artistId: number): Observable<string> {
    return this.artists$.pipe(
      map(
        (artists) =>
          artists.find((artist) => artist.id === artistId)?.name || ''
      )
    );
  }

  toggleGenreDropdown() {
    this.showGenreDropdown = !this.showGenreDropdown;
  }

  addSelectedGenre(genre: string) {
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

  selectArtist(artistId: number) {
    this.selectedArtists.push(artistId);
    this.showArtistDropdown = false;
  }

  selectGenre(genre: string) {
    this.selectedGenres.push(genre);
    this.showGenreDropdown = false;
  }
}
