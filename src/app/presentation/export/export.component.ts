import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Group } from '../../core/models/group.interface';
import { APP_URL, COUNTRIES, GROUPS } from '../../drivers/const/const';
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
  }

  private _loadObtainedStickersList() {
    this.obtainedList = Object.keys(localStorage)
    .filter(key => key.length < 4)
    .map(key => ({
      key,
      values: JSON.parse(localStorage.getItem(key) || '[]')
    }));
    console.log(this.obtainedList);
  }

  private _subscribeToPageFormChanges() {
    this.exportBy.valueChanges.subscribe({
      next: (exportBy: string) => {
        if(exportBy === 'Todas') {
          this.selectedGroup.setValue('', { emitEvent: false });
          this.selectedCountry.setValue('', { emitEvent: false });
        } else if(exportBy === 'Group') {
          this.selectedCountry.setValue('', { emitEvent: false });
        }
      }
    });

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

  private _generateMsg(countries: Country[]): string {
    let message = '¡Hola, quiero intercambiar estampas! Tengo repetidas:';
    for(const repeatedItem of this.repeatedList) {
      if(repeatedItem.values.length > 0) {
        const code = repeatedItem.key.replace('rep', '');
        const country = countries.find(x => x.code == code);
        if(country) {
          message += `\n${country.name} - `;
          for(const item of repeatedItem.values) {
            message += `${code}${item + 1}; `;
          }
        }
      }
    }
    message += '\nY estoy buscnado: ';
    for(const obtainedItem of this.obtainedList) {
      const notObtained = obtainedItem.values
      .map((value, index) => !value ? index : -1)
      .filter(index => index !== -1);
      if(notObtained.length > 0) {
        const country = countries.find(x => x.code == obtainedItem.key);
        if(country) {
          message += `\n${country.name} - `;
          for(const item of notObtained) {
            message += `${obtainedItem.key}${item + 1}; `;
          }
        }
      }
    }
    message += '\nEstoy usando app-collector para completar mi clección.\n¡Entra en el siguiente enlace para que la uses tú también!';
    message += `\n${APP_URL}`;
    navigator.clipboard.writeText(message)
    .then(() => {
      this._toastrService.success('Se ha copiado el mensaje en el portapapeles, pégalo en tu grupo de amigos.');
    })
    return message;
  }

  submit() {
    if(this.exportForm.valid) {
      if(this.exportBy.value === 'Todas') {
        this._generateMsg(COUNTRIES);
      } else if(this.exportBy.value === 'Grupo') {
        if(this.selectedGroup.value !== '') {
          this._generateMsg(this.countries);
        }
      } else if(this.exportBy.value === 'Pais') {
        if(this.selectedGroup.value !== ''
          && this.selectedCountry.value !== ''
        ) {
          const obj = COUNTRIES.find(x => x.code == this.selectedCountry.value);
          if(obj) {
            const arrCountries: Country[] = [];
            arrCountries.push(obj);
            this._generateMsg(arrCountries);
          }
        }
      }
    }
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
