import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../model/category';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUrl: string;
  constructor(private http: HttpClient) {
    this.categoryUrl = 'https://tranquil-sea-49327.herokuapp.com/categorie';
  }
  public findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl + 's');
  }
  public findCategory(id: string): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryUrl + 's?id=' + id);
  }

  public save(category: Category) {
    return this.http.post<Category>(this.categoryUrl, category);
  }
  public delete(id: number): Observable<any> {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }

  public update(id: string, category: Category): Observable<any> {
    return this.http.put(`${this.categoryUrl}/${id}`, category);
  }
}
