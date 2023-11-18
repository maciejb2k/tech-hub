import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-summary-modal',
  templateUrl: './summary-modal.component.html',
  styleUrls: ['./summary-modal.component.scss'],
})
export class SummaryModalComponent {
  @Input() isVisible: boolean;
  @Output() close = new EventEmitter();

  modalForm = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.modalForm.invalid) {
      this.modalForm.markAllAsTouched();
      return;
    }

    console.log(this.modalForm);
  }

  onModalClosed() {
    this.close.emit();
  }
}
