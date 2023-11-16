import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
  constructor(public authService: AuthService, loaderService: LoaderService) {
    super(loaderService);
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
