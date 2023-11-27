import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { InvitationsService } from '../../services/invitations.service';
import { Invitation } from '../../interfaces/employee.interfaces';

type State = {
  pagination: {
    page: number;
    first: number;
    rows: number;
  };
};

@Component({
  selector: 'app-invitations',
  templateUrl: './invitations.component.html',
  styleUrls: ['./invitations.component.scss'],
})
export class InvitationsComponent extends BaseComponent {
  results: Invitation[] = [];

  state: State = {
    pagination: {
      page: 1,
      first: 0,
      rows: 10,
    },
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
        console.log(res);
      })
    );
  }

  onPageChange(event: any) {
    this.state.pagination.page = event.page + 1;
    this.state.pagination.first = event.first;
    this.state.pagination.rows = event.rows;
  }
}
