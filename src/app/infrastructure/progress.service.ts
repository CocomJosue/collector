import { Injectable, signal, WritableSignal } from "@angular/core";
import { TOTAL_COUNT } from "../drivers/const/const";

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  progress: WritableSignal<number> = signal(0);
  totalCount: WritableSignal<number> = signal(0);

  calculateProgress() {
    this.totalCount.set(this.getTotalCount());

    this.progress.set(
      Math.round(
        this.totalCount()/TOTAL_COUNT * 100
      )
    );
  }

  getTotalCount() {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('count'))
      .reduce((sum, key) => {
        const value = Number(localStorage.getItem(key));
        return sum + (isNaN(value) ? 0 : value);
      }, 0);
  }
}