import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isLoadingSubject = new BehaviorSubject<boolean>(false);
  private requestCount = 0;

  public showLoader(): void {
    this.requestCount++;
    this.isLoadingSubject.next(true);
  }

  public hideLoader(): void {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }
}
