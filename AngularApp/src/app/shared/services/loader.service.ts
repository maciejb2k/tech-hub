import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private requestCount = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoadingSubject.asObservable();
  showSpinner = true;

  public showLoader() {
    if (this.requestCount === 0) {
      this.isLoadingSubject.next(true);
    }
    this.requestCount++;
  }

  public hideLoader() {
    this.requestCount--;
    if (this.requestCount === 0) {
      this.isLoadingSubject.next(false);
    }
  }

  public showGlobalSpinner() {
    this.showSpinner = true;
  }

  public hideGlobalSpinner() {
    this.showSpinner = false;
  }
}
