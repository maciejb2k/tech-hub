import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { FormService } from 'src/app/shared/services/form.service';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RecruiterService } from '../../services/recruiter.service';
import { RecruiterPayload } from '../../interfaces/recruiter.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-recruiter-modal',
  templateUrl: './recruiter-modal.component.html',
  styleUrls: ['./recruiter-modal.component.scss'],
})
export class RecruiterModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Input() data: number | null;
  @Output() close = new EventEmitter();
  @Output() refetch = new EventEmitter();

  modalForm = this.formBuilder.group({
    company_name: ['', Validators.required],
    company_url: [''],
    company_description: [''],
    position: [''],
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
      this.recruiterService.getRecruiterInfo().subscribe({
        next: value => {
          this.modalForm.patchValue({
            company_name: value.company_name,
            company_url: value.company_url,
            company_description: value.company_description,
            position: value.position,
          });
        },
      })
    );
  }

  update(formData: RecruiterPayload) {
    this.recruiterService.updateRecruiterInfo(this.data, formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
        this.toastService.add({
          severity: 'success',
          summary: 'Success',
          detail: "You've successfully updated a recruiter info.",
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

    const formData = this.modalForm.value as RecruiterPayload;

    this.modalForm.disable();
    this.update(formData);
  }

  onModalClosed() {
    this.modalForm.reset();
    this.close.emit();
  }

  get companyName() {
    return this.modalForm.get('company_name');
  }

  get companyUrl() {
    return this.modalForm.get('company_url');
  }

  get companyDescription() {
    return this.modalForm.get('company_description');
  }

  get position() {
    return this.modalForm.get('position');
  }
}
