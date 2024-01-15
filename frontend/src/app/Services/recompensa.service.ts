import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecompensaService {
  public baseUrl = environment.app_url;
  private recarregarRecompensasSubject = new BehaviorSubject<boolean>(false);
  private recompensaDataSubject = new BehaviorSubject<any>(null);
  recompensaData$: Observable<any> = this.recompensaDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  createRecompensa(recompensa: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/recompensa/create', recompensa);
  }

  editRecompensa(recompensa: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/recompensa/${id}`, recompensa);
  }

  listRecompensa(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/recompensa/lista');
  }

  deleteRecompensa(id: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/recompensa/delete/${id}`, {});
  }

  listTipoRecompensa(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/recompensa/tipo/lista');
  }

  emitRecarregarReconpensa(recarregar: boolean) {
    this.recarregarRecompensasSubject.next(recarregar);
  }

  getRecarregaReconpensaObservable(): Observable<boolean> {
    return this.recarregarRecompensasSubject.asObservable();
  }

  recarregarReconpensa() {
    this.recarregarRecompensasSubject.next(true);
  }

  setClienteData(clienteData: any) {
    this.recompensaDataSubject.next(clienteData);
  }

  clearReconpensaData() {
    this.recompensaDataSubject.next(null);
  }

}
