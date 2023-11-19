import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { FormService } from 'src/app/shared/services/form.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LanguagePayload } from '../../interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-language-modal',
  templateUrl: './language-modal.component.html',
  styleUrls: ['./language-modal.component.scss'],
})
export class LanguageModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  header: string;
  isEdit = false;
  modalForm = this.formBuilder.group({
    name: ['', Validators.required],
    proficiency: ['', Validators.required],
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
    this.header = this.isEdit ? 'Edit Language' : 'Add New Language';

    if (changes['data'] && this.isEdit) {
      this.show();
    }
  }

  show() {
    this.subscriptions.push(
      this.employeeService.getLanguage(this.data).subscribe({
        next: value => {
          this.modalForm.patchValue({
            name: value.name,
            proficiency: value.proficiency,
          });
        },
      })
    );
  }

  create(formData: LanguagePayload) {
    this.employeeService.addLanguage(formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully added a new language.",
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

  update(formData: LanguagePayload) {
    this.employeeService.updateLanguage(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a language.",
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
    this.employeeService.deleteLanguage(this.data).subscribe({
      next: () => {
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully deleted a language.",
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

    const formData = this.modalForm.value as LanguagePayload;

    this.modalForm.disable();
    this.isEdit ? this.update(formData) : this.create(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get name() {
    return this.modalForm.get('name');
  }

  get proficiency() {
    return this.modalForm.get('proficiency');
  }
}
