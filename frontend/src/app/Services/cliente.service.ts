import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public baseUrl = environment.app_url;
  private recarregarClientesSubject = new BehaviorSubject<boolean>(false);
  private clienteDataSubject = new BehaviorSubject<any>(null);
  clienteData$: Observable<any> = this.clienteDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  createCliente(cliente: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/cliente/register', cliente);
  }

  editCliente(cliente: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/cliente/${id}`, cliente);
  }

  listCliente(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/cliente/lista');
  }

  deleteCliente(id: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/cliente/delete/${id}`, {});
  }

  emitRecarregarClientes(recarregar: boolean) {
    this.recarregarClientesSubject.next(recarregar);
  }

  getRecarregarClientesObservable(): Observable<boolean> {
    return this.recarregarClientesSubject.asObservable();
  }

  recarregarClientes() {
    this.recarregarClientesSubject.next(true);
  }

  setClienteData(clienteData: any) {
    this.clienteDataSubject.next(clienteData);
  }

  clearClienteData() {
    this.clienteDataSubject.next(null);
  }

}
