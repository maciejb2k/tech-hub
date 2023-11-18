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
  isEditable = false;
  modals: { [key: string]: boolean } = {
    summary: false,
    skills: false,
    workExperience: false,
    education: false,
  };

  constructor(
    protected override loaderService: LoaderService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getUserData().subscribe(value => {
        this.userData = value;
        const employeeId = this.route.snapshot.paramMap.get('id');

        if (Number(employeeId) === this.userData.id) {
          this.isEditable = true;
        }
      })
    );
  }

  openModal(modalId: string) {
    this.modals[modalId] = true;
  }

  closeModal(modalId: string) {
    this.modals[modalId] = false;
  }
}
