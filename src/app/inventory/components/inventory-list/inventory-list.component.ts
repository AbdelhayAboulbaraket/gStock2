import { Component, OnInit, ViewChild } from '@angular/core';
import { Inventory } from '../../model/inventory';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InventoryService } from '../../service/inventory.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StockService } from 'src/app/stock/service/stock.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
})
export class InventoryListComponent implements OnInit {
  role: string;
  inventories: Inventory[];
  codeId: string;
  inventory: Inventory;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  displayedColumns: string[] = ['id', 'date', 'description', 'actions'];
  dataSource = new MatTableDataSource<Inventory>(this.inventories);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute,
    private stockService: StockService
  ) {
    this.role = sessionStorage.getItem('role');
    this.codeId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.inventoryService.findInventories(this.codeId).subscribe(
      (data) => {
        this.inventories = data;
        this.dataSource = new MatTableDataSource<Inventory>(this.inventories);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Inventory>(null);
      }
    );
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

  getPDF(invoiceId: number) {
    this.inventoryService.getPDF(invoiceId).subscribe(
      (data: Blob) => {
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);

        // if you want to open PDF in new tab
        window.open(fileURL);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download =
          'InventaireDuStock' + this.codeId + 'Num' + invoiceId + '.pdf';
        document.body.appendChild(a);
        a.click();
      },
      (error) => {
        console.log('getPDF error: ', error);
      }
    );
  }

  FaireInventaire() {
    this.inventory = new Inventory();
    this.stockService.findStock(this.codeId).subscribe(
      (data) => {
        console.log(data[0]);
        this.inventory.stock = data[0];
        this.inventory.description = 'Inventaire sur stock N' + this.codeId;
        this.inventoryService.save(this.inventory).subscribe((result) => {
          console.log('Inventaire crée.');
          this.inventoryService.findInventories(this.codeId).subscribe(
            (data) => {
              this.inventories = data;
              this.dataSource = new MatTableDataSource<Inventory>(
                this.inventories
              );
              this.dataSource.paginator = this.paginator;
            },
            (error) => {
              console.log('tcalma');
              this.dataSource = new MatTableDataSource<Inventory>(null);
            }
          );
        });
      },
      (error) => console.log(error)
    );
  }
  revenirAuxStocks() {
    this.router.navigate(['stock', this.codeId, 'products']);
  }
}
