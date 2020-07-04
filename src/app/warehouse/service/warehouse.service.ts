import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Warehouse } from '../model/warehouse';
import { Observable } from 'rxjs';
import { Stock } from 'src/app/stock/model/stock';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  private warehouseUrl: string;
  constructor(private http: HttpClient) {
    this.warehouseUrl = 'http://localhost:8081/emplacement';
  }
  public findAll(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.warehouseUrl + 's');
  }
  public findWarehouse(id: string): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.warehouseUrl + 's?id=' + id);
  }
  public findWarehousesWithoutStock(): Observable<Warehouse[]> {
    return this.http.get<Warehouse[]>(this.warehouseUrl + 's/sansStock');
  }
  public findStock(id: string): Observable<Stock> {
    console.log('WAREHOUSE SERVICE : ' + id);
    return this.http.get<Stock>(this.warehouseUrl + '/' + id + '/stock');
  }

  public save(warehouse: Warehouse) {
    return this.http.post<Warehouse>(this.warehouseUrl, warehouse);
  }
  public delete(id: string): Observable<any> {
    return this.http.delete(`${this.warehouseUrl}/${id}`);
  }

  public update(id: string, warehouse: Warehouse): Observable<any> {
    return this.http.put(`${this.warehouseUrl}/${id}`, warehouse);
  }
}
