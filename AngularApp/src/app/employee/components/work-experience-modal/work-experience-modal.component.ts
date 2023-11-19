import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  header: string;
  isEdit = false;
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

  ngOnChanges(changes: SimpleChanges) {
    this.isEdit = this.data ? true : false;
    this.header = this.isEdit ? 'Edit Work Experience' : 'Add Work Experience';

    if (changes['data'] && this.isEdit) {
      this.show();
    }
  }

  show() {
    this.subscriptions.push(
      this.employeeService.getWorkExperience(this.data).subscribe({
        next: value => {
          this.modalForm.patchValue({
            company_name: value.company_name,
            position: value.position,
            description: value.description,
            start_date: value.start_date,
            end_date: value.end_date,
          });
        },
      })
    );
  }

  create(formData: WorkExperiencePayload) {
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

  update(formData: WorkExperiencePayload) {
    this.employeeService.updateWorkExperience(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a work experience.",
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
    this.employeeService.deleteWorkExperience(this.data).subscribe({
      next: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully deleted a work experience.",
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

    const formData = this.modalForm.value as WorkExperiencePayload;

    this.modalForm.disable();
    this.isEdit ? this.update(formData) : this.create(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
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
