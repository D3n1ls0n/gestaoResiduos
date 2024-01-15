import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResiduoService {
  public baseUrl = environment.app_url;
  private recarregarResiduoSubject = new BehaviorSubject<boolean>(false);
  private residuoDataSubject = new BehaviorSubject<any>(null);
  clienteData$: Observable<any> = this.residuoDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  createResiduo(residuo: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/residuo/register', residuo);
  }

  editResiduo(residuo: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/residuo/${id}`, residuo);
  }

  listResiduo(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/residuo/listar');
  }

  deleteResiduo(id: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/residuo/delete/${id}`, {});
  }

  listTipoResiduo(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/residuo/tipo/listar');
  }

  emitRecarregarResiduo(recarregar: boolean) {
    this.recarregarResiduoSubject.next(recarregar);
  }

  getRecarregarResiduosObservable(): Observable<boolean> {
    return this.recarregarResiduoSubject.asObservable();
  }

  recarregarResiduos() {
    this.recarregarResiduoSubject.next(true);
  }

  setResiduoData(clienteData: any) {
    this.residuoDataSubject.next(clienteData);
  }

  clearResiduoData() {
    this.residuoDataSubject.next(null);
  }

}
