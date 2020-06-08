import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../model/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-stock-list',
  templateUrl: './product-stock-list.component.html',
  styleUrls: ['./product-stock-list.component.css'],
})
export class ProductStockListComponent implements OnInit {
  produits: Product[];
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
    'uniteDeMesure',
    'description',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>(this.produits);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
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
    console.log(produit.quantiteMin + ':' + produit.quantiteEnStock);
    if (produit.quantiteMin > produit.quantiteEnStock) {
      return true;
    }
    return false;
  }
}
