import { Component } from '@angular/core';
import { GROUPS } from '../../drivers/const/const';
import { Group } from '../../core/models/group.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import { Country } from '../../core/models/country.interface';


@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule, 
    MatInputModule,
    MatGridListModule
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
      selectedGroup: new FormControl<string | Group>(
        { value: '', disabled: false },
      ),
      selectedCountry: new FormControl<string | Country>(''),
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

  get selectedGroup() {
    return this.pageForm.get('selectedGroup') as FormControl;
  }

  get selectedCountry() {
    return this.pageForm.get('selectedCountry') as FormControl;
  }

  get selectedStickers() {
    return this.pageForm.get('selectedStickers') as FormControl;
  }
}
