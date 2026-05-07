import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { RepeatedFormComponent } from '../repeated-form/repeated-form.component';
import { GROUPS } from '../../drivers/const/const';

@Component({
  selector: 'app-repeated',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink
],
  templateUrl: './repeated.component.html',
  styleUrl: './repeated.component.css'
})
export class RepeatedComponent {
  readonly dialog = inject(MatDialog);
  repeatedList: { key: string, values: number[] }[] = [];

  ngOnInit() {
    this.loadRepeatedStickersList();
  }

  loadRepeatedStickersList() {
    this.repeatedList = Object.keys(localStorage)
    .filter(key => key.startsWith('rep'))
    .map(key => ({
      key,
      values: JSON.parse(localStorage.getItem(key) || '[]')
    }));
  }

  getFlag(code: string) {
    return `https://api.fifa.com/api/v3/picture/flags-sq-1/${code}`;
  }

  getCountryGroup(code: string) {
    for (const group of GROUPS) {
      const country = group.countries.find(
        c => c.code === code
    );

    if (country) {
      return {
        group: group.letter,
        name: country.name
      };
    }
  }

    return null;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RepeatedFormComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRepeatedStickersList();
    });
  }
}
