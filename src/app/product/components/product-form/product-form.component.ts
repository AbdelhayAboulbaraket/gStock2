import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product';
import { ProviderService } from 'src/app/provider/service/provider.service';
import { WarehouseService } from 'src/app/warehouse/service/warehouse.service';
import { UnitService } from 'src/app/unit/service/unit.service';
import { CategoryService } from 'src/app/category/service/category.service';
import { Provider } from 'src/app/provider/model/provider';
import { Category } from 'src/app/category/model/category';
import { Warehouse } from 'src/app/warehouse/model/warehouse';
import { Unit } from 'src/app/unit/model/unit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
  providers: Provider[];
  stateCtrl = new FormControl();
  filteredStates: Observable<Provider[]>;
  categories: Category[];
  warehouses: Warehouse[];
  units: Unit[];

  get identifiant() {
    return this.productForm.get('identifiant');
  }
  get nom() {
    return this.productForm.get('nom');
  }
  get description() {
    return this.productForm.get('description');
  }
  get type() {
    return this.productForm.get('type');
  }
  get quantiteDisponible() {
    return this.productForm.get('quantiteDisponible');
  }
  get categorie() {
    return this.productForm.get('categorie');
  }
  get fournisseur() {
    return this.productForm.get('fournisseur');
  }
  get uniteDeMesure() {
    return this.productForm.get('uniteDeMesure');
  }
  get emplacement() {
    return this.productForm.get('emplacement');
  }
  get prixAchat() {
    return this.productForm.get('prixAchat');
  }
  get quantiteMin() {
    return this.productForm.get('quantiteMin');
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private providerService: ProviderService,
    private warehouseService: WarehouseService,
    private unitService: UnitService,
    private categoryService: CategoryService
  ) {
    this.product = new Product();
  }
  onSubmit() {
    this.product = this.productForm.value;
    console.log(this.product);
    this.productService
      .save(this.product)
      .subscribe((result) => this.gotoProductList());
  }

  gotoProductList() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      identifiant: new FormControl('', Validators.nullValidator),
      nom: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
      type: new FormControl('', Validators.required),
      categorie: new FormControl('', Validators.required),
      uniteDeMesure: new FormControl('', Validators.required),
      quantiteMin: new FormControl('', Validators.required),
    });

    this.categoryService.findAll().subscribe((data) => {
      this.categories = data;
    });
    this.unitService.findAll().subscribe((data) => {
      this.units = data;
    });
  }
}
