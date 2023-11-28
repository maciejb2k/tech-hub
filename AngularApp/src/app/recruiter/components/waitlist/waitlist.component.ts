import { Component } from '@angular/core';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { WaitlistService } from '../../services/waitlist.service';
import { Waitlist } from '../../interfaces/recruiter.interfaces';

@Component({
  selector: 'app-waitlist',
  templateUrl: './waitlist.component.html',
  styleUrls: ['./waitlist.component.scss'],
})
export class WaitlistComponent extends BaseComponent {
  results: Waitlist[];

  constructor(
    protected override loaderService: LoaderService,
    private waitlistService: WaitlistService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.subscriptions.push(
      this.waitlistService.getWaitlist().subscribe(res => {
        this.results = res;
        this.onDataLoaded();
      })
    );
  }

  destroy(id: number) {
    this.subscriptions.push(
      this.waitlistService.deleteWaitlist(id).subscribe(res => {
        this.fetchData();
      })
    );
  }
}
