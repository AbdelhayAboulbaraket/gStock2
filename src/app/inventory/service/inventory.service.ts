import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventory } from '../model/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private inventoryUrl: string;
  constructor(private http: HttpClient) {
    this.inventoryUrl = 'http://localhost:8081/inventaire';
  }
  public findAll(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.inventoryUrl + 's');
  }
  public findInventories(id: string): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(
      'http://localhost:8081/stock/' + id + '/inventaires'
    );
  }

  public save(inventory: Inventory) {
    return this.http.post<Inventory>(this.inventoryUrl, inventory);
  }

  getPDF(invoiceId: number): Observable<Blob> {
    return this.http.get<Blob>(this.inventoryUrl + 'PDF/' + invoiceId, {
      responseType: 'blob' as 'json',
    });
  }
}
