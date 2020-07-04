import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  produits: Product[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'identifiant',
    'nom',
    'categorie',
    'typeDeProduit',
    'quantiteDisponible',
    'uniteDeMesure',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>(this.produits);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  deleteProduct(id: string) {
    this.productService.delete(id).subscribe(
      (data) => {
        this.productService.findAll().subscribe(
          (data) => {
            this.produits = data;
            this.dataSource = new MatTableDataSource<Product>(this.produits);
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Product>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.productService.findAll().subscribe(
      (data) => {
        this.produits = data;
        console.log(this.produits);
        this.dataSource = new MatTableDataSource<Product>(this.produits);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Product>(null);
      }
    );
  }
  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: 'Voulez vous supprimer le produit ' + code + '?',
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
