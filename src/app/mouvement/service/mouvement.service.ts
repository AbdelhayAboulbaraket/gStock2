import { Injectable } from '@angular/core';
import { Mouvement } from '../model/mouvement';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MouvementService {
  private mouvementUrl: string;
  constructor(private http: HttpClient) {
    this.mouvementUrl = 'http://localhost:8081/mouvement';
  }
  public findAll(): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.mouvementUrl + 's');
  }
  public findMouvement(id: string): Observable<Mouvement[]> {
    return this.http.get<Mouvement[]>(this.mouvementUrl + 's?id=' + id);
  }

  public save(mouvement: Mouvement) {
    return this.http.post<Mouvement>(this.mouvementUrl, mouvement);
  }
  // public delete(id: number): Observable<any> {
  //   return this.http.delete(`${this.mouvementUrl}/${id}`);
  // }

  // public update(id: string, mouvement: Mouvement): Observable<any> {
  //   return this.http.put(`${this.mouvementUrl}/${id}`, mouvement);
  // }
}
