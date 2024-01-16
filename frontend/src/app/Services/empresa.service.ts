import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  public baseUrl = environment.app_url;
  private recarregarEmpresasSubject = new BehaviorSubject<boolean>(false);
  private empresaDataSubject = new BehaviorSubject<any>(null);
  empresaData$: Observable<any> = this.empresaDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  createEmpresa(empresa: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/empresa/register', empresa);
  }

  editEmpresa(empresa: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/empresa/${id}`, empresa);
  }

  listEmpresa(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/empresa/lista');
  }

  deleteEmpresa(id: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/empresa/delete/${id}`, {});
  }

  listEmailEmpresa(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/empresa/lista/email');
  }

  emitRecarregarEmpresas(recarregar: boolean) {
    this.recarregarEmpresasSubject.next(recarregar);
  }

  getRecarregaEmpresasObservable(): Observable<boolean> {
    return this.recarregarEmpresasSubject.asObservable();
  }

  recarregarEmpresas() {
    this.recarregarEmpresasSubject.next(true);
  }

  setEmpresaData(empresaData: any) {
    this.empresaDataSubject.next(empresaData);
  }

  clearEmpresaData() {
    this.empresaDataSubject.next(null);
  }
}
