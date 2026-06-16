import { Component } from '@angular/core';
import {Sort, MatSortModule} from '@angular/material/sort';
import { ListItem } from '../../core/models/list-item.interface';
import { COUNTRIES } from '../../drivers/const/const';

@Component({
  selector: 'app-count-list',
  standalone: true,
  imports: [
    MatSortModule
  ],
  templateUrl: './count-list.component.html',
  styleUrl: './count-list.component.css'
})
export class CountListComponent {
  countryList: ListItem[] = [];
  sortedData: ListItem[];

  constructor() {
    this.sortedData = this.countryList.slice();
  }

  ngOnInit() {
    this._getCountryList();
  }

  private _getCountryList() {
    for(const country of COUNTRIES) {
      const count = localStorage.getItem(`count${country.code}`);
      if(count) {
        const numberCount = Number(count);
        let percentage = 0;
        if(country.code !== 'CC')
          percentage = numberCount / 20;
        else
          percentage = numberCount / 14;
        this.countryList.push({
          country: `(${country.code}) ${country.name}`,
          count: numberCount,
          percentage: Math.round(percentage * 100),
          repeated: 0
        })
      }
    }
  }

  sortData(sort: Sort) {
    const data = this.countryList.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'country':
          return compare(a.country, b.country, isAsc);
        case 'count':
          return compare(a.count, b.count, isAsc);
        case 'percentage':
          return compare(a.percentage, b.percentage, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
