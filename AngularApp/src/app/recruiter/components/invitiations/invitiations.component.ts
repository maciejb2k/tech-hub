import { Component } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { InvitationsService } from '../../services/invitations.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { InvitationPaginable } from '../../interfaces/recruiter.interfaces';
import { ModalsData, ProfileSections } from 'src/app/employee/interfaces/employee.interfaces';

type State = {
  pagination: {
    page: number;
    first: number;
    rows: number;
  };
};

@Component({
  selector: 'app-invitiations',
  templateUrl: './invitiations.component.html',
  styleUrls: ['./invitiations.component.scss'],
})
export class InvitiationsComponent extends BaseComponent {
  results: InvitationPaginable;

  state: State = {
    pagination: {
      page: 1,
      first: 0,
      rows: 10,
    },
  };

  modals: ProfileSections = {
    invitation: false,
  };

  modalsData: ModalsData = {
    invitation: null,
  };

  constructor(
    protected override loaderService: LoaderService,
    private invitationsService: InvitationsService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.subscriptions.push(
      this.invitationsService.getInvitations().subscribe(res => {
        this.results = res;
        this.onDataLoaded();
      })
    );
  }

  openModal(modalId: string, id?: number) {
    this.modals[modalId] = true;

    if (id) {
      this.modalsData[modalId] = id;
    }
  }

  closeModal(modalId: string) {
    this.modals[modalId] = false;
    this.modalsData[modalId] = null;
  }

  onPageChange(event: any) {
    this.state.pagination.page = event.page + 1;
    this.state.pagination.first = event.first;
    this.state.pagination.rows = event.rows;
  }
}
