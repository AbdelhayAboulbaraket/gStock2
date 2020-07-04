import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Provider } from '../model/provider';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private providerUrl: string;
  constructor(private http: HttpClient) {
    this.providerUrl = 'http://localhost:8081/fournisseur';
  }
  public findAll(): Observable<Provider[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Provider[]>(this.providerUrl + 's');
  }
  public findProvider(code: string): Observable<Provider[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Provider[]>(this.providerUrl + 's?id=' + code);
  }

  public save(category: Provider) {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Provider>(this.providerUrl, category);
  }
  public delete(id: string): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete(`${this.providerUrl}/${id}`);
  }

  public update(id: string, category: Provider): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put(`${this.providerUrl}/${id}`, category);
  }
}
