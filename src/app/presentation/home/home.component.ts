import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  welcomeForm!: FormGroup;
  showWelcomeCard: boolean = false;
  actualUsername: string | null = "";
  actualGender: string | null = "";
  greeting: string = "";

  ngOnInit() {
    this._initForm();
    this._getUserData();
    this.showWelcomeCard = this.actualUsername == null;
  }

  private _initForm() {
    this.welcomeForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      gender: new FormControl('', [Validators.required])
    });
  }

  private _getUserData() {
    this.actualUsername = localStorage.getItem('username');
    this.actualGender = localStorage.getItem('gender');
    this.greeting = `Bienvenid${this.actualGender} ${this.actualUsername}`;
  }

  submit() {
    if(this.welcomeForm.valid) {
      localStorage.setItem('username', this.username.value);
      localStorage.setItem('gender', this.gender.value);
    }
  }

  get username() {
    return this.welcomeForm.get('username') as FormControl;
  }

  get gender() {
    return this.welcomeForm.get('gender') as FormControl;
  }
}
