import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BaseComponent } from '../base/base.component';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService],
})
export class LayoutComponent extends BaseComponent {
  constructor(
    public messageService: MessageService,
    public toastService: ToastService,
    loaderService: LoaderService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.toastService.messages$.subscribe(messages => {
        if (messages) {
          messages.forEach(message => {
            this.messageService.add(message);
          });
        }
      })
    );
  }
}
