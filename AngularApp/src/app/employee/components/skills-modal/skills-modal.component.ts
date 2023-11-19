import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { FormService } from 'src/app/shared/services/form.service';
import { AddSkillPayload } from '../../interfaces/employee.interfaces';
import { ErrorResponse } from 'src/app/auth/interfaces/auth.interfaces';
import { Message, MessageService } from 'primeng/api';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss'],
  providers: [MessageService],
})
export class SkillsModalComponent extends BaseComponent {
  @Input() isVisible: boolean;
  @Output() close = new EventEmitter();

  isAddMode = true;
  dataFetched = false;
  modalForm = this.formBuilder.group({
    name: ['', Validators.required],
    level: ['1', Validators.required],
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

    const formData = this.modalForm.value as AddSkillPayload;

    this.employeeService.addNewSkill(formData).subscribe({
      next: () => {
        this.modalForm.enable();
        this.modalForm.reset();
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

  get name() {
    return this.modalForm.get('name');
  }

  get level() {
    return this.modalForm.get('level');
  }
}
