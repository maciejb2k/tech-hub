import { Component, EventEmitter, Input, Output } from '@angular/core';
import { tap } from 'rxjs';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { FormService } from 'src/app/shared/services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';
import { RecruiterService } from '../../services/recruiter.service';
import { UserPayload } from '../../interfaces/recruiter.interfaces';

@Component({
  selector: 'app-recruiter-user-modal',
  templateUrl: './recruiter-user-modal.component.html',
  styleUrls: ['./recruiter-user-modal.component.scss'],
})
export class RecruiterUserModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  userId: number;
  email: string;

  modalForm = this.formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
  });

  constructor(
    protected override loaderService: LoaderService,
    private recruiterService: RecruiterService,
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
      this.recruiterService
        .getUserInfo()
        .pipe(
          tap(res => {
            this.userId = res.id;
            this.email = res.email;
          })
        )
        .subscribe({
          next: value => {
            this.modalForm.patchValue({
              first_name: value.first_name,
              last_name: value.last_name,
            });
          },
        })
    );
  }

  update(formData: UserPayload) {
    this.recruiterService.updateUserInfo(this.userId, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a user info.",
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

    const formData = this.modalForm.getRawValue() as UserPayload;

    this.modalForm.disable();
    this.update(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get firstName() {
    return this.modalForm.get('first_name');
  }

  get lastName() {
    return this.modalForm.get('last_name');
  }
}
