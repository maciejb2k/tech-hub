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

  constructor(protected loaderService: LoaderService) {
    this.subscriptions.push(
      this.loaderService.isLoading$.subscribe(value => {
        this.isLoading = value;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
