import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  template: '',
  styles: [],
})
export class BaseComponent {
  subscriptions: Subscription[] = [];
  isLoading = false;
  hasLoadedData = false;

  constructor(protected loaderService: LoaderService) {
    this.subscriptions.push(
      this.loaderService.isLoading$.subscribe(value => {
        if (!this.hasLoadedData) {
          this.isLoading = value;
        }
      })
    );
  }

  onDataLoaded() {
    this.hasLoadedData = true;
    this.isLoading = false;
  }

  enableGlobalSpinner() {
    this.loaderService.showGlobalSpinner();
  }

  disableGlobalSpinner() {
    this.loaderService.hideGlobalSpinner();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
