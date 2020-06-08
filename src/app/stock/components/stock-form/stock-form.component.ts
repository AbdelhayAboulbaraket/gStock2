import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Stock } from '../../model/stock';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StockService } from '../../service/stock.service';
import { WarehouseService } from 'src/app/warehouse/service/warehouse.service';
import { Warehouse } from 'src/app/warehouse/model/warehouse';

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css'],
})
export class StockFormComponent implements OnInit {
  stockForm: FormGroup;
  stock: Stock;
  warehouses: Warehouse[];

  get id() {
    return this.stockForm.get('id');
  }
  get telephone() {
    return this.stockForm.get('telephone');
  }
  get fax() {
    return this.stockForm.get('fax');
  }

  get emplacement() {
    return this.stockForm.get('emplacement');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private stockService: StockService,
    private warehouseService: WarehouseService
  ) {
    this.stock = new Stock();
  }
  onSubmit() {
    this.stock = this.stockForm.value;
    this.stockService
      .save(this.stock)
      .subscribe((result) => this.gotoStockList());
  }

  gotoStockList() {
    this.router.navigate(['/stocks']);
  }

  ngOnInit(): void {
    this.stockForm = new FormGroup({
      telephone: new FormControl('', Validators.required),
      fax: new FormControl('', Validators.required),
      emplacement: new FormControl('', Validators.required),
    });
    this.warehouseService.findWarehousesWithoutStock().subscribe((data) => {
      this.warehouses = data;
    });
  }
}
