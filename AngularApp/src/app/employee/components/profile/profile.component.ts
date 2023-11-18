import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileData } from 'src/app/auth/interfaces/auth.interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent {
  userData: ProfileData;
  isOwner = false;

  constructor(
    protected override loaderService: LoaderService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    const employeeId = this.route.snapshot.paramMap.get('id');

    this.subscriptions.push(
      this.authService.getUserData().subscribe(value => {
        this.userData = value;
      })
    );
  }
}
