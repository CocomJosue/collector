import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MAIL_ADDRESS } from '../../drivers/const/const';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  mailAddress = MAIL_ADDRESS;
}
