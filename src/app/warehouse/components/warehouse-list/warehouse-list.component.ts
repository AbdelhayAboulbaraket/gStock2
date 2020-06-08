import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseService } from '../../service/warehouse.service';
import { Warehouse } from '../../model/warehouse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css'],
})
export class WarehouseListComponent implements OnInit {
  warehouses: Warehouse[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['id', 'designation', 'adresse', 'actions'];
  dataSource = new MatTableDataSource<Warehouse>(this.warehouses);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private warehouseService: WarehouseService,
    private route: Router
  ) {}
  deleteWarehouse(id: string) {
    this.warehouseService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.warehouseService.findAll().subscribe(
          (data) => {
            this.warehouses = data;
            this.dataSource = new MatTableDataSource<Warehouse>(
              this.warehouses
            );
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Warehouse>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.warehouseService.findAll().subscribe(
      (data) => {
        this.warehouses = data;
        this.dataSource = new MatTableDataSource<Warehouse>(this.warehouses);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Warehouse>(null);
      }
    );
  }
  goToWarehouseItem(code: string) {
    this.route.navigate(['/warehouse/' + code]);
  }
  goToStockForm(code: string) {
    this.route.navigate(['/warehouse/' + code + '/stockForm']);
  }
}
