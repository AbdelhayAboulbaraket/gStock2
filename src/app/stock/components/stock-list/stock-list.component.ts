import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../../model/stock';
import { StockService } from '../../service/stock.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css'],
})
export class StockListComponent implements OnInit {
  stocks: Stock[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'identifiant',
    'fax',
    'telephone',
    'emplacement',
    'actions',
  ];
  dataSource = new MatTableDataSource<Stock>(this.stocks);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private stockService: StockService,
    private route: Router,
    public dialog: MatDialog
  ) {}
  deleteStock(id: number) {
    console.log(id);
    this.stockService.delete(id).subscribe(
      (data) => {
        this.stockService.findAll().subscribe(
          (data) => {
            this.stocks = data;
            this.dataSource = new MatTableDataSource<Stock>(this.stocks);
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Stock>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.stockService.findAll().subscribe(
      (data) => {
        this.stocks = data;
        this.dataSource = new MatTableDataSource<Stock>(this.stocks);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Stock>(null);
      }
    );
  }
  goToProducts(code: string) {
    this.route.navigate(['/stock/' + code + '/products']);
  }

  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Voulez vous supprimer le stock ' + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteStock(result.data.codeSupp);
      }
    });
  }
}
