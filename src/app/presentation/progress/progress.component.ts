import { Component, inject } from '@angular/core';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ProgressService } from '../../infrastructure/progress.service';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  progressService = inject(ProgressService);

  mode: ProgressSpinnerMode = 'determinate';
  value = 60;
}
