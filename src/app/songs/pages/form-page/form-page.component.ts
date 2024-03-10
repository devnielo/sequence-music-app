import { loadCompanies } from './../../../companies/store/actions/company.actions';
import { loadArtists } from './../../../artists/store/actions/artist.actions';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as ArtistActions from '../../../artists/store/actions/artist.actions';
import * as CompanyActions from '../../../companies/store/actions/company.actions';
import * as fromArtistSelectors from '../../../artists/store/selectors/artist.selectors';
import * as fromCompanySelectors from '../../../companies/store/selectors/company.selectors';
import { Artist } from 'src/app/artists/interfaces/artist.interface';
import { Company } from 'src/app/companies/interfaces/company.interface';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
})
export class FormPageComponent implements OnInit {
  form!: FormGroup;
  artists$: Observable<Artist[]>;
  companies$: Observable<Company[]>;
  availableGenres = environment.genres;

  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    // Inicializar los observables en el constructor
    this.artists$ = this.store.select(fromArtistSelectors.selectAllArtists);
    this.companies$ = this.store.select(fromCompanySelectors.selectAllCompanies);

    this.initForm(); // Inicializar el formulario aquí
  }

  ngOnInit(): void {
    // Cargar los artistas y compañías en ngOnInit
    this.store.dispatch(loadArtists());
    this.store.dispatch(loadCompanies());
  }

  private initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      artist: [null, Validators.required],
      genres: this.fb.array([]),
      company: [null, Validators.required],
      year: [null, Validators.required],
      rating: [
        null,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }


  private loadInitialData(): void {
    this.store.dispatch(ArtistActions.loadArtists());
    this.store.dispatch(CompanyActions.loadCompanies());

    // Asigna los observables
    this.artists$ = this.store.select(fromArtistSelectors.selectAllArtists);
    this.companies$ = this.store.select(fromCompanySelectors.selectAllCompanies);
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Aquí iría la lógica para enviar los datos a la API
    }
  }

  get genres() {
    return this.form.get('genres') as FormArray;
  }

  addGenre(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (input.value && this.availableGenres.includes(input.value)) {
      this.genres.push(this.fb.control(input.value));
      input.value = '';
    }
    event.preventDefault();
  }

  removeGenre(index: number) {
    this.genres.removeAt(index);
  }

  return(): void {
    this.router.navigate(['/songs']);
  }
}
