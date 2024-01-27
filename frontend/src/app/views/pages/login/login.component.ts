import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UtilsService } from 'src/app/Services/utils.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public isPasswordVisible: boolean = false;
  public loading: boolean = false;
  public meuFormulario: any;
  public validateForm: boolean = false;

  constructor(private authService: AuthService, private utils: UtilsService,     public modal: NgxSmartModalService,
    ) {}

  createFrm() {
    this.meuFormulario = this.utils.createForm(
      { name: 'username', value: null, required: true },
      { name: 'password', value: null, required: true }
    );
  }

  viewPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  submit() {
    this.loading = true;
    this.authService.login(this.meuFormulario.value, '/api/user/login');
  }
  openCreateClient(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  openCreateCompany(modalId: string): void {
    this.modal.getModal(modalId).open();
  }

  ngOnInit() {
    this.createFrm();
  }
}
