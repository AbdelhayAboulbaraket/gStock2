import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product.service';

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

  constructor(private productService: ProductService) {}

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
        this.dataSource = new MatTableDataSource<Product>(this.produits);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Product>(null);
      }
    );
  }
}
