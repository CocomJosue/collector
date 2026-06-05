import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { RepeatedFormComponent } from '../repeated-form/repeated-form.component';
import { GROUPS } from '../../drivers/const/const';
import { MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-repeated',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatChipsModule,
    MatIconModule
],
  templateUrl: './repeated.component.html',
  styleUrl: './repeated.component.css'
})
export class RepeatedComponent {
  groups = GROUPS;
  readonly dialog = inject(MatDialog);
  repeatedList: { key: string, values: number[] }[] = [];
  totalRepeatedCount = 0;

  constructor(private _toastrService: ToastrService) {}

  ngOnInit() {
    this._loadRepeatedStickersList();
  }

  private _loadRepeatedStickersList() {
    this.repeatedList = [];
    for(const group of this.groups) {
      for(const country of group.countries){
        const code = `rep${country.code}`;
        const repArray = localStorage.getItem(code);
        if(repArray !== null) {
          this.repeatedList.push({ key: code, values: JSON.parse(repArray) });
        }
      }
    }
    this._calculateTotalCount();
  }

  private _calculateTotalCount() {
    let count = 0;
    for(const repeatedItem of this.repeatedList) {
      count += repeatedItem.values.length;
    }
    this.totalRepeatedCount = count;
  }

  getFlag(code: string) {
    return `https://api.fifa.com/api/v3/picture/flags-sq-1/${code}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RepeatedFormComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      this._loadRepeatedStickersList();
    });
  }

  getCode(item: string) {
    return item.replace('rep', '');
  }

  remove(country: string, number: number) {    
    const strRepeatedList = localStorage.getItem(`rep${country}`);
    if(strRepeatedList) {
      const repeatedList: any[] = JSON.parse(strRepeatedList);
      const index = repeatedList.indexOf(number);
      if (index !== -1) {
        repeatedList.splice(index, 1);
        localStorage.setItem(`rep${country}`, JSON.stringify(repeatedList));
        this._toastrService.success(`Se eliminó la estampa repetida ${country}${number}`);
        this._loadRepeatedStickersList();
      }
    }
  }
}
