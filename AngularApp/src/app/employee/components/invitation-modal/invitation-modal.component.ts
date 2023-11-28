import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { InvitationsService } from '../../services/invitations.service';
import { FormService } from 'src/app/shared/services/form.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { InvitationPayload } from 'src/app/employee/interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-invitation-modal',
  templateUrl: './invitation-modal.component.html',
  styleUrls: ['./invitation-modal.component.scss'],
})
export class InvitationModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  modalForm = this.formBuilder.group({
    message: ['', Validators.required],
  });

  constructor(
    protected override loaderService: LoaderService,
    private invitationsService: InvitationsService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    super(loaderService);
  }

  create(formData: InvitationPayload) {
    this.invitationsService.addInvitation(formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully invited the employee.",
        });
        this.refetch.emit();
        this.close.emit();
      },
      error: (error: ErrorResponse) => {
        this.modalForm.enable();
        this.toastService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
        this.formService.handleFormErrors(this.modalForm, error.errors);
      },
    });
  }

  onSubmit() {
    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    const formData: InvitationPayload = {
      status: 'Pending',
      message: this.modalForm.value.message,
      employee_id: this.data,
    };

    this.modalForm.disable();
    this.create(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get message() {
    return this.modalForm.get('message');
  }
}
