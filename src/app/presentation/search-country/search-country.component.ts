import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { COUNTRIES } from '../../drivers/const/const';
import { Country } from '../../core/models/country.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-country',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatAutocompleteModule,
    CommonModule
  ],
  templateUrl: './search-country.component.html',
  styleUrl: './search-country.component.css'
})
export class SearchCountryComponent {
  readonly dialogRef = inject(MatDialogRef<SearchCountryComponent>);
  countries: Country[] = COUNTRIES;
  countryControl = new FormControl<string | Country>('');

  filteredCountries$!: Observable<Country[]>;

  ngOnInit(): void {
    this.filteredCountries$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const searchValue =
          typeof value === 'string'
            ? value.toLowerCase()
            : `${value?.code} ${value?.name}`.toLowerCase();

        return this.filterCountries(searchValue);
      })
    );
  }

  private filterCountries(searchValue: string): Country[] {
    return this.countries.filter(country =>
      country.code.toLowerCase().includes(searchValue) ||
      country.name.toLowerCase().includes(searchValue)
    );
  }

  displayCountry(country: Country): string {
    return country
      ? `${country.code} - ${country.name}`
      : '';
  }

  onCountrySelected(country: Country): void {
    this.dialogRef.close(country);
  }
}
