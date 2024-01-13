import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public baseUrl = environment.app_url;

  constructor(private http: HttpClient) {}

  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/cliente/register', cliente);
  }
}
