import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl: string;
  constructor(private http: HttpClient) {
    this.userUrl = 'https://tranquil-sea-49327.herokuapp.com/utilisateur';
  }
  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + 's');
  }

  public save(user: User) {
    return this.http.post<User>(this.userUrl, user);
  }
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.userUrl}/${id}`);
  }
  public findUser(id: string): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl + 's?id=' + id);
  }
  public update(id: string, user: User): Observable<any> {
    let username = 'admin';
    let password = 'admin';
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password),
    });
    return this.http.put(`${this.userUrl}/${id}`, user, { headers });
  }
}
