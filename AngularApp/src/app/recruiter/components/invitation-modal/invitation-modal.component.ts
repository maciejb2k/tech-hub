import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FormService } from 'src/app/shared/services/form.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { InvitationsService } from '../../services/invitations.service';
import { InvitationPayload } from '../../interfaces/recruiter.interfaces';

type Message = {
  name: string;
  code: string;
};

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

  messageOptions: Message[] = [
    { name: 'Pending', code: 'Pending' },
    { name: 'Finished', code: 'Finished' },
    { name: 'Cancelled', code: 'Cancelled' },
  ];

  modalForm = this.formBuilder.group({
    status: new FormControl<Message | null>(this.messageOptions[0], Validators.required),
    message: ['', Validators.required],
  });

  employeeId: number | null;
  invitationId: number | null;

  constructor(
    protected override loaderService: LoaderService,
    private invitationsService: InvitationsService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {
    super(loaderService);
  }

  ngOnChanges() {
    if (this.isVisible && this.data) {
      this.show();
    }
  }

  show() {
    this.subscriptions.push(
      this.invitationsService.getInvitation(this.data).subscribe({
        next: value => {
          const status = this.messageOptions.find(option => option.code === value.data.status);
          const message = value.data.message;

          this.modalForm.patchValue({
            status,
            message,
          });
        },
      })
    );
  }

  update(formData: InvitationPayload) {
    this.invitationsService.updateInvitation(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a invitation.",
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

  destroy() {
    this.invitationsService.deleteInvitation(this.data).subscribe({
      next: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully deleted a invitation.",
        });
        this.refetch.emit();
        this.close.emit();
      },
      error: (error: ErrorResponse) => {
        this.toastService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
    });
  }

  onSubmit() {
    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    const formData: InvitationPayload = {
      status: this.status.value.code,
      message: this.message.value,
    };

    this.modalForm.disable();
    this.update(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get status() {
    return this.modalForm.get('status');
  }

  get message() {
    return this.modalForm.get('message');
  }
}
