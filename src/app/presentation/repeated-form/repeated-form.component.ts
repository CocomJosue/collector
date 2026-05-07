import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Group } from '../../core/models/group.interface';
import { Country } from '../../core/models/country.interface';
import { GROUPS } from '../../drivers/const/const';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-repeated-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule
],
  templateUrl: './repeated-form.component.html',
  styleUrl: './repeated-form.component.css'
})
export class RepeatedFormComponent {
  readonly dialogRef = inject(MatDialogRef<RepeatedFormComponent>);
  repeatedForm!: FormGroup;
  groups: Group[] = GROUPS;
  countries: Country[] = [];
  numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  times = Array.from({ length: 99 }, (_, i) => i + 1);

  ngOnInit() {
    this._initForm();
    this._subscribeToPageFormChanges();
  }

  private _initForm() {
    this.repeatedForm = new FormGroup({
      selectedGroup: new FormControl<string | Group>('', [Validators.required]),
      selectedCountry: new FormControl<string>('', [Validators.required]),
      selectedSticker: new FormControl<number>(0, [Validators.required]),
      times: new FormControl<number>(0, [Validators.required])
    })
  }

  private _subscribeToPageFormChanges() {
    this.selectedGroup.valueChanges.subscribe({
      next: (group: Group) => {
        this.countries = group.countries;
        this.selectedCountry.setValue('', { emitEvent: false });
      }
    });
  }

  getFlag(code: string) {
    return `https://api.fifa.com/api/v3/picture/flags-sq-1/${code}`;
  }
  
  cancelAction() {
    this.dialogRef.close();
  }

  submit() {

  }

  get selectedGroup() {
      return this.repeatedForm.get('selectedGroup') as FormControl;
    }
  
    get selectedCountry() {
      return this.repeatedForm.get('selectedCountry') as FormControl;
    }
  
    get selectedStickers() {
      return this.repeatedForm.get('selectedSticker') as FormControl;
    }
}
