import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from '../model/stock';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stockUrl: string;
  constructor(private http: HttpClient) {
    this.stockUrl = 'https://tranquil-sea-49327.herokuapp.com/stock';
  }
  public findAll(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockUrl + 's');
  }

  public findStock(id: string): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockUrl + 's?id=' + id);
  }

  public save(category: Stock) {
    return this.http.post<Stock>(this.stockUrl, category);
  }
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.stockUrl}/${id}`);
  }

  public update(id: string, category: Stock): Observable<any> {
    return this.http.put(`${this.stockUrl}/${id}`, category);
  }
}
