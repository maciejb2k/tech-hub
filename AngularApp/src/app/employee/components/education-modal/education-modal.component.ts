import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { FormService } from 'src/app/shared/services/form.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';
import { EducationPayload } from '../../interfaces/employee.interfaces';

@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.scss'],
})
export class EducationModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  header: string;
  isEdit = false;
  modalForm = this.formBuilder.group({
    field_of_study: ['', Validators.required],
    university_name: ['', Validators.required],
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

  ngOnChanges(changes: SimpleChanges) {
    this.isEdit = this.data ? true : false;
    this.header = this.isEdit ? 'Edit Education' : 'Add Education';

    if (changes['data'] && this.isEdit) {
      this.show();
    }
  }

  show() {
    this.subscriptions.push(
      this.employeeService.getEducation(this.data).subscribe({
        next: value => {
          this.modalForm.patchValue({
            field_of_study: value.field_of_study,
            university_name: value.university_name,
            description: value.description,
            start_date: value.start_date,
            end_date: value.end_date,
          });
        },
      })
    );
  }

  create(formData: EducationPayload) {
    this.employeeService.addEducation(formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully added an education.",
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

  update(formData: EducationPayload) {
    this.employeeService.updateEducation(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated an education.",
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
    this.employeeService.deleteEducation(this.data).subscribe({
      next: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully deleted an education.",
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

    const formData = this.modalForm.value as EducationPayload;

    this.modalForm.disable();
    this.isEdit ? this.update(formData) : this.create(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get fieldOfStudy() {
    return this.modalForm.get('field_of_study');
  }

  get universityName() {
    return this.modalForm.get('university_name');
  }

  get description() {
    return this.modalForm.get('description');
  }

  get startDate() {
    return this.modalForm.get('start_date');
  }

  get endDate() {
    return this.modalForm.get('end_date');
  }
}
