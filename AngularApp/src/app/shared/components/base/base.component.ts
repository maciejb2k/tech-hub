import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  template: '',
  styles: [],
})
export class BaseComponent {
  isLoading = false;
  private isLoadingSubscription: Subscription;

  constructor(protected loaderService: LoaderService) {
    this.isLoadingSubscription = this.loaderService.isLoading$.subscribe(value => {
      this.isLoading = value;
    });
  }

  ngOnDestroy(): void {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }
}
