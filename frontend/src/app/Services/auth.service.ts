import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventService } from '../Services/refresh.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = environment.app_url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private jwtHelper: JwtHelperService,
    private eventService: EventService
  ) {}

  public login(data: any, url: string) {
    try {
      this.http.post<any>(this.baseUrl + url, data).subscribe(
        (response) => {
          if (response) {
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('username', JSON.stringify(response.username));
            localStorage.setItem('userId', JSON.stringify(response.id));
            localStorage.setItem(
              'cliente_id',
              JSON.stringify(response.cliente_id)
            );
            localStorage.setItem(
              'empresa_id',
              JSON.stringify(response.empresa_id)
            );
            localStorage.setItem(
              'is_superadmin',
              JSON.stringify(response.is_superadmin)
            );
            localStorage.setItem('token', JSON.stringify(response.token));
            this.router.navigate(['/']);
            this.toast.success('Login efectuado com sucesso!', 'Usuários');
            this.eventService.emitLoginSuccess();
          } else {
            this.router.navigate(['/login']);
            this.toast.error('Erro ao efectuar login!', 'Usuários');
          }
        },
        (error) => {
          /* Tratar erros aqui */
          console.error('Erro ao autenticar usuário:', error);
          this.router.navigate(['/login']);
          this.toast.error('Erro ao autenticar usuário!', 'Usuários');
        }
      );
    } catch (error) {
      /* Tratar erros aqui */
      console.error('Erro ao autenticar usuário:', error);
      this.router.navigate(['/login']);
      this.toast.error('Erro ao autenticar usuário!', 'Usuários');
    }
  }

  public logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/show-slide']);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    // Verifica se o token está presente e não é nulo
    if (token) {
      // Verifica se o token não expirou
      return !this.jwtHelper.isTokenExpired(token);
    }

    // Se o token for nulo, o usuário não está autenticado
    return false;
  }
}
