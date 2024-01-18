import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  public baseUrl = environment.app_url;
  private recarregarStocksSubject = new BehaviorSubject<boolean>(false);
  private stockDataSubject = new BehaviorSubject<any>(null);
  stockData$: Observable<any> = this.stockDataSubject.asObservable();

  constructor(private http: HttpClient) {}

  createStock(stock: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/api/stock/register', stock);
  }

  editStock(stock: any, id: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/stock/${id}`, stock);
  }

  resetStock(stockIds: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/stock/edit`, stockIds);
  }

  listStock(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/api/stock/lista');
  }

  deleteStock(id: any): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/api/stock/delete/${id}`, {});
  }

  emitRecarregarStock(recarregar: boolean) {
    this.recarregarStocksSubject.next(recarregar);
  }

  getRecarregarStocksObservable(): Observable<boolean> {
    return this.recarregarStocksSubject.asObservable();
  }

  recarregarStocks() {
    this.recarregarStocksSubject.next(true);
  }

  setStockData(stockData: any) {
    this.stockDataSubject.next(stockData);
  }

  clearStockData() {
    this.stockDataSubject.next(null);
  }

}
