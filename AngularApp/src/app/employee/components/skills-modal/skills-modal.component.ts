import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-skills-modal',
  templateUrl: './skills-modal.component.html',
  styleUrls: ['./skills-modal.component.scss'],
})
export class SkillsModalComponent extends BaseComponent implements OnChanges {
  @Input() isVisible: boolean;
  @Output() close = new EventEmitter();
  dataFetched = false;
  modalForm = this.formBuilder.group({});

  constructor(
    protected override loaderService: LoaderService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    super(loaderService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isVisible'] && this.isVisible && !this.dataFetched) {
      this.subscriptions.push(
        this.employeeService.getSkills().subscribe(value => {
          console.log(value);
        })
      );
    }
  }

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
