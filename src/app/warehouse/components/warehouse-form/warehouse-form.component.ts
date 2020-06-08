import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from '../../service/warehouse.service';
import { Warehouse } from '../../model/warehouse';

@Component({
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.css'],
})
export class WarehouseFormComponent implements OnInit {
  warehouseForm: FormGroup;
  warehouse: Warehouse;

  get id() {
    return this.warehouseForm.get('id');
  }
  get nom() {
    return this.warehouseForm.get('nom');
  }
  get adresse() {
    return this.warehouseForm.get('adresse');
  }

  get designation() {
    return this.warehouseForm.get('designation');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService
  ) {
    this.warehouse = new Warehouse();
  }
  onSubmit() {
    this.warehouse = this.warehouseForm.value;
    this.warehouseService
      .save(this.warehouse)
      .subscribe((result) => this.gotoWarehouseList());
  }

  gotoWarehouseList() {
    this.router.navigate(['/warehouses']);
  }

  ngOnInit(): void {
    this.warehouseForm = new FormGroup({
      adresse: new FormControl('', Validators.nullValidator),
      designation: new FormControl('', Validators.required),
    });
  }
}
