import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Group } from '../../core/models/group.interface';
import { COUNTRIES, GROUPS } from '../../drivers/const/const';
import { Country } from '../../core/models/country.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-export',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatButton,
    RouterLink,
  ],
  templateUrl: './export.component.html',
  styleUrl: './export.component.css'
})
export class ExportComponent {
  exportForm!: FormGroup;
  groups: Group[] = GROUPS;
  countries: Country[] = [];
  repeatedList: { key: string, values: number[] }[] = [];
  obtainedList: { key: string, values: number[] }[] = [];
  options: string[] = ['Todas', 'Grupo', 'Pais']

  constructor(private _toastrService: ToastrService) {}

  ngOnInit() {
    this._initForm();
    this._subscribeToPageFormChanges();
    this._loadRepeatedStickersList();
    this._loadObtainedStickersList();
  }

  private _initForm() {
    this.exportForm = new FormGroup({
      exportBy: new FormControl<string>('', [Validators.required]),
      selectedGroup: new FormControl<string | Group>('', []),
      selectedCountry: new FormControl<string>('', []),
    });
  }

  private _loadRepeatedStickersList() {
    this.repeatedList = Object.keys(localStorage)
    .filter(key => key.startsWith('rep'))
    .map(key => ({
      key,
      values: JSON.parse(localStorage.getItem(key) || '[]')
    }));
    console.log('Repetidas', this.repeatedList);
  }

  private _loadObtainedStickersList() {
    this.obtainedList = Object.keys(localStorage)
    .filter(key => key.length === 3)
    .map(key => ({
      key,
      values: JSON.parse(localStorage.getItem(key) || '[]')
    }));
    console.log('Obtenidas', this.obtainedList);
    
  }

  private _subscribeToPageFormChanges() {
    this.selectedGroup.valueChanges.subscribe({
      next: (group: Group) => {
        this.countries = group.countries;
        this.selectedCountry.setValue('', { emitEvent: false });
      }
    });

    this.selectedCountry.valueChanges.subscribe({
      next: (country: string) => {
        const saved = localStorage.getItem(country);
        if(saved) {
        } else {
        }
      }
    });
  }

  getFlag(code: string) {
    return `https://api.fifa.com/api/v3/picture/flags-sq-1/${code}`;
  }

  submit() {
    let message = '¡Hola, quiero intercambiar estampas! Tengo repetidas: ';
    if(this.exportForm.valid) {
      if(this.exportBy.value === 'Todas') {
        this.countries = COUNTRIES;
        for(const repeatedList of this.repeatedList) {
          if(repeatedList.values.length > 0) {
            const code = repeatedList.key.replace('rep', '');
            const country = this.countries.find(x => x.code == code);
            if(country) {
              message += `${country.name} - `;
              for(const item of repeatedList.values) {
                message += `${code}${item + 1}; `;
              }
            }
          }
        }
      }
    }
    message += 'Estoy usando app-collector.netlify.app para completar mi clección.'
    navigator.clipboard.writeText(message)
    .then(() => {
      this._toastrService.success('Se ha copiado el mensaje en el portapapeles, pégalo en tu grupo de amigos.');
    })
  }

  get selectedGroup() {
    return this.exportForm.get('selectedGroup') as FormControl;
  }

  get selectedCountry() {
    return this.exportForm.get('selectedCountry') as FormControl;
  }

  get exportBy() {
    return this.exportForm.get('exportBy') as FormControl;
  }
}
