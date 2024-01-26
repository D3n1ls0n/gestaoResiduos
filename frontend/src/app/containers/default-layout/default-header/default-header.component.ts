import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {
  @Input() sidebarId: string = 'sidebar';

  public newMessages = new Array(4);
  public newTasks = new Array(5);
  public newNotifications = new Array(5);
  public light: boolean = false;

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService
  ) {
    super();
  }

  OnOff() {
    setInterval(() => {
      this.light = !this.light;
    }, 600);
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.OnOff();
  }
}
