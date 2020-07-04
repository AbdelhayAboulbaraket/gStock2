import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { Inventory } from 'src/app/inventory/model/inventory';
import { InventoryService } from 'src/app/inventory/service/inventory.service';
import { StockService } from 'src/app/stock/service/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-stock-list',
  templateUrl: './product-stock-list.component.html',
  styleUrls: ['./product-stock-list.component.css'],
})
export class ProductStockListComponent implements OnInit {
  produits: Product[];
  inventory: Inventory;
  codeId: string;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'identifiant',
    'nom',
    'categorie',
    'typeDeProduit',
    'emplacement',
    'prixAchat',
    'fournisseur',
    'quantiteEnStock',
    'quantiteMin',
    'uniteDeMesure',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>(this.produits);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private inventoryService: InventoryService,
    public dialog: MatDialog
  ) {}

  deleteProduct(id: string) {
    this.productService.delete(id).subscribe(
      (data) => {
        this.productService.findFullProducts(this.codeId).subscribe(
          (data) => {
            this.produits = data;
            this.dataSource = new MatTableDataSource<Product>(this.produits);
          },
          (error) => {
            Product;
            this.dataSource = new MatTableDataSource<Product>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.codeId = this.route.snapshot.params['id'];
    this.productService.findFullProducts(this.codeId).subscribe(
      (data) => {
        this.produits = data;
        this.dataSource = new MatTableDataSource<Product>(this.produits);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Product>(null);
      }
    );
  }
  enRupture(produit: Product) {
    if (produit.quantiteMin > produit.quantiteEnStock) {
      return true;
    }
    return false;
  }

  FaireInventaire() {
    this.inventory = new Inventory();
    this.stockService.findStock(this.codeId).subscribe(
      (data) => {
        this.inventory.stock = data[0];
      },
      (error) => console.log(error)
    );
    console.log(this.inventory.stock);
    this.inventoryService
      .save(this.inventory)
      .subscribe((result) => console.log('Inventaire crée.'));
  }
  goToInventories() {
    this.router.navigate(['/stock/' + this.codeId + '/inventories']);
  }
  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Voulez vous supprimer le produit  ' + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteProduct(result.data.codeSupp);
      }
    });
  }
}
