import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ProgressService } from '../../infrastructure/progress.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-import-progress',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIcon, MatTooltipModule],
  templateUrl: './import-progress.component.html',
  styleUrl: './import-progress.component.css'
})
export class ImportProgressComponent {
  constructor(private _toastrService: ToastrService) {}

  checkData() {
    return localStorage.length !== 0;
  }

  exportLocalStorage(): void {
    const data: Record<string, any> = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (key) {
        const value = localStorage.getItem(key);

        try {
          data[key] = JSON.parse(value ?? '');
        } catch {
          data[key] = value;
        }
      }
    }

    const blob = new Blob(
      [JSON.stringify(data, null, 2)],
      { type: 'application/json' }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-collector-progress.json';
    a.click();

    window.URL.revokeObjectURL(url);
  }

  importLocalStorage(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const content = reader.result as string;

        const data = JSON.parse(content);

        Object.keys(data).forEach(key => {
          const value = data[key];

          localStorage.setItem(
            key,
            typeof value === 'string'
              ? value
              : JSON.stringify(value)
          );
        });
        this._toastrService.success('Progreso importado correctamente');
        window.location.reload();
      } catch (error) {
        this._toastrService.error('Error al importar el archivo');
      }

      input.value = '';
    };

    reader.readAsText(file);
  }
}
