import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BairroService {
  public baseUrl = environment.app_url;

  constructor(private http: HttpClient) {}

  obterBairro(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/bairro');
  }
}
