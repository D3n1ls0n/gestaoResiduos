import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public baseUrl = environment.app_url;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService,
    private jwtHelper: JwtHelperService
  ) {}

  public login(data: any, url: string) {
    try {
      this.http.post<any>(this.baseUrl + url, data).subscribe(
        (response) => {
          if (response) {
            console.log(response);

            localStorage.setItem('user', JSON.stringify(response));
            this.router.navigate(['/']);
            this.toast.success('Login efectuado com sucesso!', 'Usuários');
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
    this.router.navigate(['/login']);
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
