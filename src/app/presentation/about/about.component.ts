import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { DIF_CHANNEL } from '../../drivers/const/const';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    MatCardModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
    difChannel = DIF_CHANNEL;
}
