import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { FormService } from 'src/app/shared/services/form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { WorkExperiencePayload } from '../../interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-work-experience-modal',
  templateUrl: './work-experience-modal.component.html',
  styleUrls: ['./work-experience-modal.component.scss'],
})
export class WorkExperienceModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  isAddMode = true;
  modalForm = this.formBuilder.group({
    company_name: ['', Validators.required],
    position: ['', Validators.required],
    description: [''],
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
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

  onSubmit() {
    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    const formData = this.modalForm.value as WorkExperiencePayload;

    this.employeeService.addWorkExperience(formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();

        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully added a new work experience.",
        });

        this.refetch.emit();
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

  onModalClosed() {
    this.close.emit();
  }

  get companyName() {
    return this.modalForm.get('company_name');
  }

  get startDate() {
    return this.modalForm.get('start_date');
  }

  get endDate() {
    return this.modalForm.get('end_date');
  }

  get position() {
    return this.modalForm.get('position');
  }

  get description() {
    return this.modalForm.get('description');
  }
}
