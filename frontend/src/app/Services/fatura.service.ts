import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaturaService {
  public baseUrl = environment.app_url;
  private recarregarFaturaSubject = new BehaviorSubject<boolean>(false);
  private FaturaDataSubject = new BehaviorSubject<any>(null);
  clienteData$: Observable<any> = this.FaturaDataSubject.asObservable();
  constructor(private http: HttpClient) {}

  createFatura(fat: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/factura/gerarFaturas__', fat);
  }

  emitRecarregarClientes(recarregar: boolean) {
    this.recarregarFaturaSubject.next(recarregar);
  }

  getRecarregarClientesObservable(): Observable<boolean> {
    return this.recarregarFaturaSubject.asObservable();
  }

  recarregarClientes() {
    this.recarregarFaturaSubject.next(true);
  }
}
