import { Component, inject } from '@angular/core';
import { GROUPS } from '../../drivers/const/const';
import { Group } from '../../core/models/group.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { Country } from '../../core/models/country.interface';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ProgressService } from '../../infrastructure/progress.service';
import { ToastrService } from 'ngx-toastr';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { SearchCountryComponent } from '../search-country/search-country.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-album-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckbox,
    MatButton,
    MatButtonModule,
    MatIcon,
    MatTooltipModule,
    CommonModule
],
  templateUrl: './album-page.component.html',
  styleUrl: './album-page.component.css'
})
export class AlbumPageComponent {
  progressService = inject(ProgressService);
  readonly dialog = inject(MatDialog);
  pageForm!: FormGroup;
  groups: Group[] = GROUPS;
  countries: Country[] = [];

  constructor(private _toastrService: ToastrService) {}

  ngOnInit() {
    this._initForm();
    this._subscribeToPageFormChanges();
  }

  private _initForm() {
    this.pageForm = new FormGroup({
      selectedGroup: new FormControl<string | Group>('', [Validators.required]),
      selectedCountry: new FormControl<string>('', [Validators.required]),
      selectedStickers: new FormArray(
        Array.from({ length: 20 }, () => new FormControl(false))
      ),
      selectAllControl: new FormControl<boolean>(false, [])
    });
  }

  private _subscribeToPageFormChanges() {
    this.selectedGroup.valueChanges.subscribe({
      next: (group: Group) => {
        this.countries = group.countries;
        this.selectedCountry.setValue('', { emitEvent: false });
        this.selectAll(false);
      }
    });

    this.selectedCountry.valueChanges.subscribe({
      next: (country: string) => {
        this.selectAllControl.setValue(false);
        const saved = localStorage.getItem(country);
        if(saved) {
          this.selectedStickers.setValue(JSON.parse(saved), { emitEvent: false });
          if(country === 'CC') {
            for(const [index, value] of this.selectedStickers.controls.entries()) {
              if(index > 13) {
                value.setValue(true, { emitEvent: false });
              }
            }
          }
        } else {
          this.selectAll(false);
          this.selectAllControl.setValue(false);
        }
      }
    });
  }

  searchCountry() {
    this.selectedCountry.setValue('');
    this.selectedGroup.setValue('');
    this.pageForm.updateValueAndValidity();
    const dialogRef = this.dialog.open(SearchCountryComponent, { });

    dialogRef.afterClosed().subscribe((result: Country | undefined ) => {
      if(result != undefined) {
        const group = this.groups.find(group => group.letter === `Grupo ${result.group}`);
        this.selectedGroup.setValue(group);
        this.selectedCountry.setValue(result.code);
        this.pageForm.updateValueAndValidity();
      }
    });
  }

  getFlag(code: string) {
    return `https://api.fifa.com/api/v3/picture/flags-sq-1/${code}`;
  }

  getPercentage(code: string): number {
    const count = localStorage.getItem(`count${code}`);
    if(count) {
      const numberCount = Number(count);
      if(code != 'CC' && code != 'FWC')
        return Math.round(numberCount / 20 * 100);
      else
        return Math.round(numberCount / 14 * 100);
    }
    return 0;
  }

  getBackground(code: string): string {
    const startFade = Math.max(0, this.getPercentage(code));
    return `linear-gradient(
      to right,
      #d7f3d7 ${startFade}%,
      rgba(141,224,141,0) ${this.getPercentage(code)}%
    )`;
  }

  selectAll(actual: boolean) {
    for(const control of this.selectedStickers.controls) {
      control.setValue(actual, { emitEvent: false });
    }
  }

  submit() {
    if(this.pageForm.valid){
      localStorage.setItem(this.selectedCountry.value, JSON.stringify(this.selectedStickers.value));
      const checkedCount = this.selectedStickers.value
        .filter((value: boolean) => value)
        .length;
      localStorage.setItem(`count${this.selectedCountry.value}`, checkedCount.toString());
      this.progressService.calculateProgress();
      this._toastrService.success('Guardado con éxito');
    }
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

  get selectAllControl() {
    return this.pageForm.get('selectAllControl') as FormControl;
  }
}
