import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { FormService } from 'src/app/shared/services/form.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { PreferencesPayload } from '../../interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';
import { SelectItemGroup, TreeNode } from 'primeng/api';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-preferences-modal',
  templateUrl: './preferences-modal.component.html',
  styleUrls: ['./preferences-modal.component.scss'],
})
export class PreferencesModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  header: string;
  isEdit = false;
  modalForm = this.formBuilder.group({
    field_name: ['', Validators.required],
    visibility: ['', Validators.required],
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
    this.isEdit = this.data ? true : false;
    this.header = this.isEdit ? 'Edit Preference' : 'Add Preference';

    if (this.isVisible && this.data && this.isEdit) {
      this.show();
    }
  }

  show() {
    this.subscriptions.push(
      this.employeeService.getPreferences(this.data).subscribe({
        next: value => {
          this.modalForm.patchValue({
            field_name: value.field_name,
            visibility: value.visibility,
          });
        },
      })
    );
  }

  create(formData: PreferencesPayload) {
    this.employeeService.addPreferences(formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully added a preference.",
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

  update(formData: PreferencesPayload) {
    this.employeeService.updatePreferences(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a preference.",
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
    this.employeeService.deletePreferences(this.data).subscribe({
      next: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully deleted a preference.",
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

    const formData = this.modalForm.value as PreferencesPayload;

    this.modalForm.disable();
    this.isEdit ? this.update(formData) : this.create(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get fieldName() {
    return this.modalForm.get('field_name');
  }

  get visibility() {
    return this.modalForm.get('visibility');
  }
}
