import { Component } from '@angular/core';
import { GROUPS } from '../../drivers/const/const';
import { Group } from '../../core/models/group.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { Country } from '../../core/models/country.interface';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatGridListModule,
    MatCheckbox,
    MatButton
  ],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css'
})
export class AlbumPageComponent {
  pageForm!: FormGroup;
  groups: Group[] = GROUPS;
  countries: Country[] = [];

  ngOnInit() {
    this._initForm();
    this._subscribeToPageFormChanges();
  }

  private _initForm() {
    this.pageForm = new FormGroup({
      selectedGroup: new FormControl<string | Group>('', [Validators.required]),
      selectedCountry: new FormControl<string | Country>('', [Validators.required]),
      selectedStickers: new FormArray(
        Array.from({ length: 30 }, () => new FormControl(false))
      )
    });
  }

  private _subscribeToPageFormChanges() {
    this.selectedGroup.valueChanges.subscribe({
      next: (group: Group) => {
        this.countries = group.countries;
      }
    });
  }

  submit() {

  }

  get selectedGroup() {
    return this.pageForm.get('selectedGroup') as FormControl;
  }

  get selectedCountry() {
    return this.pageForm.get('selectedCountry') as FormControl;
  }

  get selectedStickers() {
    return this.pageForm.get('selectedStickers') as FormArray;
  }
}
