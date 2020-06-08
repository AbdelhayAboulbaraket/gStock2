import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from '../../service/warehouse.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Warehouse } from '../../model/warehouse';

@Component({
  selector: 'app-warehouse-item',
  templateUrl: './warehouse-item.component.html',
  styleUrls: ['./warehouse-item.component.css'],
})
export class WarehouseItemComponent implements OnInit {
  codeId: string;
  warehouseForm: FormGroup;
  warehouse: Warehouse;
  get designation() {
    return this.warehouseForm.get('designation');
  }

  get adresse() {
    return this.warehouseForm.get('adresse');
  }
  get description() {
    return this.warehouseForm.get('description');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService
  ) {
    this.warehouse = new Warehouse();
  }
  ngOnInit(): void {
    this.warehouseForm = new FormGroup({
      designation: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
      adresse: new FormControl('', Validators.nullValidator),
    });
    this.codeId = this.route.snapshot.params['id'];
    this.warehouseService.findWarehouse(this.codeId).subscribe(
      (data) => {
        this.warehouse = data[0];
        console.log(this.warehouse);
        this.designation.setValue(this.warehouse.designation);
        this.adresse.setValue(this.warehouse.adresse);
      },
      (error) => console.log('error')
    );
  }

  onSubmit() {
    this.warehouse = this.warehouseForm.value;
    this.warehouseService
      .update(this.codeId, this.warehouse)
      .subscribe((result) => this.gotoWarehouseList());
  }

  gotoWarehouseList() {
    this.router.navigate(['/warehouses']);
  }

  reset() {
    this.warehouseForm.reset(this.warehouse);
  }
}
