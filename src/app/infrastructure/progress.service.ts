import { Injectable, signal, WritableSignal } from "@angular/core";
import { TOTAL_COUNT } from "../drivers/const/const";

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  progress: WritableSignal<number> = signal(0);

  calculateProgress() {
    const total = Object.keys(localStorage)
      .filter(key => key.startsWith('count'))
      .reduce((sum, key) => {
        const value = Number(localStorage.getItem(key));
        return sum + (isNaN(value) ? 0 : value);
      }, 0);

    this.progress.set(
      Math.round(
        total/TOTAL_COUNT * 100
      )
    );
  }
}