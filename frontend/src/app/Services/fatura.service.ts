import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FaturaService {
  public baseUrl = environment.app_url;

  constructor(private http: HttpClient) {}

  createFatura(fat: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/factura/gerarFaturas__', fat);
  }
}
