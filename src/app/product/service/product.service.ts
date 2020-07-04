import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl: string;
  constructor(private http: HttpClient) {
    this.productUrl = 'http://localhost:8081/produit';
  }
  public findAll(): Observable<Product[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Product[]>(this.productUrl + 's');
  }
  public findFullProducts(id: string): Observable<Product[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Product[]>(
      'http://localhost:8081/stock/' + id + '/produits'
    );
  }
  public findProduct(code: string): Observable<Product[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Product[]>(this.productUrl + 's?id=' + code);
  }

  public save(category: Product) {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Product>(this.productUrl, category);
  }
  public delete(id: string): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  public update(id: string, category: Product): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put(`${this.productUrl}/${id}`, category);
  }
}
