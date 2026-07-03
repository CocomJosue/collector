import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CountListComponent } from '../count-list/count-list.component';
import { ProgressComponent } from '../progress/progress.component';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatCardModule,
    RouterLink,
    ProgressComponent,
    CountListComponent
  ],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent { }
