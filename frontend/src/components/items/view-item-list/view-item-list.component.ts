import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-view-item-list',
  templateUrl: './view-item-list.component.html',
  styleUrl: './view-item-list.component.scss',
})
export class ViewItemListComponent {
  public baseUrl = environment.app_url;
  public faturas: any;
  public loading: boolean = false;
  public empresa_id: any;

  constructor(private http: HttpClient, private router: Router) {}

  getItem() {
    this.empresa_id = localStorage.getItem('empresa_id');
    if (this.empresa_id) {
      // Certifique-se de que empresa_id está definido
      this.http
        .get<any>(this.baseUrl + '/api/factura/listarFaturasComInfo')
        .subscribe((response) => {
          if (response) {
            this.faturas = response.filter((fatura: any) => fatura.empresaId == this.empresa_id);
          }
        });
    } else {
      console.error('ID da empresa não está definido.');
    }
  }



  ngOnInit() {
    this.getItem();

  }
}
