import { Component, OnInit } from '@angular/core';
import { Mouvement } from '../../model/mouvement';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/product/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MouvementService } from '../../service/mouvement.service';
import { WarehouseService } from 'src/app/warehouse/service/warehouse.service';
import { Product } from 'src/app/product/model/product';
import { Warehouse } from 'src/app/warehouse/model/warehouse';
import { ProviderService } from 'src/app/provider/service/provider.service';
import { Provider } from 'src/app/provider/model/provider';
import { Stock } from 'src/app/stock/model/stock';
import { StockService } from 'src/app/stock/service/stock.service';

@Component({
  selector: 'app-mouvement-form',
  templateUrl: './mouvement-form.component.html',
  styleUrls: ['./mouvement-form.component.css'],
})
export class MouvementFormComponent implements OnInit {
  mouvementForm: FormGroup;
  mouvement: Mouvement;
  products: Product[];
  stocks: Stock[];
  providers: Provider[];

  get id() {
    return this.mouvementForm.get('id');
  }

  get description() {
    return this.mouvementForm.get('description');
  }
  get type() {
    return this.mouvementForm.get('type');
  }

  get quantite() {
    return this.mouvementForm.get('quantite');
  }

  get fournisseur() {
    return this.mouvementForm.get('fournisseur');
  }

  get emplacement() {
    return this.mouvementForm.get('emplacement');
  }
  get prixAchat() {
    return this.mouvementForm.get('prixAchat');
  }

  onFileChanged(event) {
    const file = event.target.files[0];
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mouvementService: MouvementService,
    private productService: ProductService,
    private providerService: ProviderService,
    private stockService: StockService
  ) {
    this.mouvement = new Mouvement();
  }
  onSubmit() {
    this.mouvement = this.mouvementForm.value;
    this.mouvement.produit.fournisseur = this.fournisseur.value;
    this.mouvement.produit.prixAchat = this.prixAchat.value;
    this.mouvement.produit.description = this.description.value;
    this.mouvement.produit.quantiteEnStock = this.quantite.value;

    console.log(this.mouvement);
    this.mouvementService
      .save(this.mouvement)
      .subscribe((result) => this.gotoMouvementList());
  }

  gotoMouvementList() {
    this.router.navigate(['/mouvements']);
  }

  ngOnInit(): void {
    this.mouvementForm = new FormGroup({
      id: new FormControl('', Validators.nullValidator),
      type: new FormControl('', Validators.required),
      produit: new FormControl('', Validators.required),
      quantite: new FormControl('', Validators.required),
      fournisseur: new FormControl('', Validators.required),
      stock: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
      prixAchat: new FormControl('', Validators.required),
    });
    this.productService.findAll().subscribe((data) => {
      this.products = data;
    });
    this.stockService.findAll().subscribe((data) => {
      this.stocks = data;
    });
    this.providerService.findAll().subscribe((data) => {
      this.providers = data;
    });
  }
}
