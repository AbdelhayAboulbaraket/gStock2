import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { WarehouseService } from '../../service/warehouse.service';
import { Warehouse } from '../../model/warehouse';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css'],
})
export class WarehouseListComponent implements OnInit {
  role: string;
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
    private route: Router,
    public dialog: MatDialog
  ) {
    this.role = sessionStorage.getItem('role');
  }

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

  isUser() {
    if (this.role === 'User') {
      return true;
    }
    return false;
  }
  isAdmin() {
    if (this.role === 'Admin') {
      return true;
    }
    return false;
  }

  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'entrepot " + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteWarehouse(result.data.codeSupp);
      }
    });
  }
}
