import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Unit } from '../model/unit';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  private unitUrl: string;
  private unitUrl2: string;
  constructor(private http: HttpClient) {
    this.unitUrl = 'http://localhost:8081/unitesDeMesure';
    this.unitUrl2 = 'http://localhost:8081/uniteDeMesure';
  }
  public findAll(): Observable<Unit[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });

    return this.http.get<Unit[]>(this.unitUrl);
  }
  public findUnit(id: string): Observable<Unit[]> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.get<Unit[]>(this.unitUrl + '?id=' + id);
  }

  public save(unit: Unit) {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.post<Unit>(this.unitUrl2, unit);
  }
  public delete(id: string): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.delete(`${this.unitUrl2}/${id}`);
  }

  public update(id: string, unit: Unit): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put(`${this.unitUrl2}/${id}`, unit);
  }
}
