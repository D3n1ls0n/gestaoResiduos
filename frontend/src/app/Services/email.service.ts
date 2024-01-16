import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  public baseUrl = environment.app_url;

  constructor(private http: HttpClient) {}

  sendemail(email: any): Observable<any> {
    console.log(email);

    //const email = 'denilson105joao@gmail.com';
    return this.http.post<any>(this.baseUrl + '/api/mail/sendemail', {email});
  }
}
