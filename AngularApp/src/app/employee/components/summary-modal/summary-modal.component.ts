import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FormService } from 'src/app/shared/services/form.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { EmployeePayload } from '../../interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  modalForm = this.formBuilder.group({
    location: [''],
    bio: [''],
    expected_salary: [''],
    portfolio: [''],
  });

  constructor(
    protected override loaderService: LoaderService,
    private employeeService: EmployeeService,
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
      this.employeeService.getEmployeeInfo(this.data).subscribe({
        next: value => {
          this.modalForm.patchValue({
            location: value.location,
            bio: value.bio,
            expected_salary: value.expected_salary,
            portfolio: value.portfolio,
          });
        },
      })
    );
  }

  update(formData: EmployeePayload) {
    this.employeeService.updateEmployeeInfo(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a summary.",
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

    const formData = this.modalForm.value as EmployeePayload;

    this.modalForm.disable();
    this.update(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get location() {
    return this.modalForm.get('location');
  }

  get bio() {
    return this.modalForm.get('bio');
  }

  get expectedSalary() {
    return this.modalForm.get('expected_salary');
  }

  get portfolio() {
    return this.modalForm.get('portfolio');
  }
}
