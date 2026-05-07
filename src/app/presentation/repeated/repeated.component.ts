import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { RepeatedFormComponent } from '../repeated-form/repeated-form.component';

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

  loadRepeatedStickersList() {

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RepeatedFormComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRepeatedStickersList();
    });
  }
}
