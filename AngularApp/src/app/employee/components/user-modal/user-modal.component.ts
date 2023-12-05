import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { FormService } from 'src/app/shared/services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserPayload } from '../../interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent extends BaseComponent {
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
    private employeeService: EmployeeService,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private authService: AuthService
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
      this.employeeService
        .getUserInfo(this.data)
        .pipe(
          tap(res => {
            this.userId = res.id;
          })
        )
        .subscribe({
          next: value => {
            this.modalForm.patchValue({
              first_name: value.first_name,
              last_name: value.last_name,
            });
            this.email = value.email;
          },
        })
    );
  }

  update(formData: UserPayload) {
    this.employeeService.updateUserInfo(this.userId, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a user info.",
        });

        this.authService.updateUserName(formData.first_name, formData.last_name);

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
