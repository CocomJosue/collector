import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Group } from '../../core/models/group.interface';
import { Country } from '../../core/models/country.interface';
import { GROUPS } from '../../drivers/const/const';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { SearchCountryComponent } from '../search-country/search-country.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-exchange-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButton,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatSelectModule,
    MatIcon
],
  templateUrl: './exchange-form.component.html',
  styleUrl: './exchange-form.component.css'
})
export class ExchangeFormComponent {
  readonly dialogRef = inject(MatDialogRef<ExchangeFormComponent>);
  exchangeForm!: FormGroup;
  readonly dialog = inject(MatDialog);
  groups: Group[] = GROUPS;
  numbers = Array.from({ length: 20 }, (_, i) => i + 1);

  constructor(private _toastrService: ToastrService) {}

  ngOnInit() {
    this._initForm();
  }

  private _initForm() {
    this.exchangeForm = new FormGroup({
      exchangeMessage: new FormControl<string>('', [Validators.required]),
    })
  }

  getFlag(code: string) {
    return `https://api.fifa.com/api/v3/picture/flags-sq-1/${code}`;
  }

  cancelAction() {
    this.dialogRef.close();
  }

  check() {
    
  }

  submit() {
    if(this.exchangeForm.valid) {
    }
  }

  get exchangeMessage() {
    return this.exchangeForm.get('exchangeMessage') as FormControl;
  }
}
