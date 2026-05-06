import { signal, WritableSignal } from "@angular/core";

export class ProgressService {
  progress: WritableSignal<number> = signal(0);
}