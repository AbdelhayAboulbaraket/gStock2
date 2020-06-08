import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/category/service/category.service';
import { Unit } from '../../model/unit';
import { UnitService } from '../../service/unit.service';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css'],
})
export class UnitFormComponent implements OnInit {
  unitForm: FormGroup;
  unit: Unit;

  get nom() {
    return this.unitForm.get('designation');
  }
  get description() {
    return this.unitForm.get('description');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unitService: UnitService
  ) {
    this.unit = new Unit();
  }
  onSubmit() {
    this.unit = this.unitForm.value;
    this.unitService.save(this.unit).subscribe((result) => this.gotoUnitList());
  }

  gotoUnitList() {
    this.router.navigate(['/units']);
  }

  ngOnInit(): void {
    this.unitForm = new FormGroup({
      designation: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
    });
  }
}
