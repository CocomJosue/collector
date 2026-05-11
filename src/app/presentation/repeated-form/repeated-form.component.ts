import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Group } from '../../core/models/group.interface';
import { Country } from '../../core/models/country.interface';
import { GROUPS } from '../../drivers/const/const';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private _toastrService: ToastrService) {}

  ngOnInit() {
    this._initForm();
    this._subscribeToPageFormChanges();
  }

  private _initForm() {
    this.repeatedForm = new FormGroup({
      selectedGroup: new FormControl<string | Group>('', [Validators.required]),
      selectedCountry: new FormControl<string>('', [Validators.required]),
      selectedSticker: new FormControl<number>(0, [Validators.required])
    })
  }

  private _subscribeToPageFormChanges() {
    this.selectedGroup.valueChanges.subscribe({
      next: (group: Group) => {
        this.countries = group.countries;
        this.selectedCountry.setValue('', { emitEvent: false });
        this.selectedSticker.setValue(0, { emitEvent: false });
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
    if(this.repeatedForm.valid) {
      const stickersObtained = localStorage.getItem(this.selectedCountry.value);
      if(stickersObtained) {
        const arrStickersObtained = JSON.parse(stickersObtained);
        const sticker = arrStickersObtained.at(this.selectedSticker.value);        
        if(sticker) {
          const saved = localStorage.getItem(`rep${this.selectedCountry.value}`);
          if(saved) {
            const actual = JSON.parse(saved);
            if(actual.includes(this.selectedSticker.value)){
              this._toastrService.error('Esta estampa ya está registrada como repetida, no es necesario registrarla de nuevo');
              return;
            } else {
              actual.push(this.selectedSticker.value);
              localStorage.setItem(`rep${this.selectedCountry.value}`, JSON.stringify(actual))
            }
          } else {
            const arrRepeats: any[] = [];
            arrRepeats.push(this.selectedSticker.value);
            localStorage.setItem(`rep${this.selectedCountry.value}`, JSON.stringify(arrRepeats))
          }
          this._toastrService.success('Estampa repetida guardada con éxito');
          this.dialogRef.close();
        } else {
          this._toastrService.error('La estampa no está registrada, regresa al menú anterior');
        }
      } else { 
          this._toastrService.error('Aún no registras estampas de este país. Regresa al menú anterior');
      }
    }
  }

  get selectedGroup() {
      return this.repeatedForm.get('selectedGroup') as FormControl;
    }
  
    get selectedCountry() {
      return this.repeatedForm.get('selectedCountry') as FormControl;
    }
  
    get selectedSticker() {
      return this.repeatedForm.get('selectedSticker') as FormControl;
    }
}
