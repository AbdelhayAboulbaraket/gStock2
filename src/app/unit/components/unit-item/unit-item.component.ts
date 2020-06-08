import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Unit } from '../../model/unit';
import { Router, ActivatedRoute } from '@angular/router';
import { UnitService } from '../../service/unit.service';

@Component({
  selector: 'app-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.css'],
})
export class UnitItemComponent implements OnInit {
  codeId: string;
  unitForm: FormGroup;
  unit: Unit;
  get designation() {
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
  ngOnInit(): void {
    this.unitForm = new FormGroup({
      designation: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
    });
    this.codeId = this.route.snapshot.params['id'];
    this.unitService.findUnit(this.codeId).subscribe(
      (data) => {
        this.unit = data[0];
        this.designation.setValue(this.unit.designation);
        this.description.setValue(this.unit.description);
      },
      (error) => console.log('error')
    );
  }

  onSubmit() {
    this.unit = this.unitForm.value;
    this.unitService
      .update(this.codeId, this.unit)
      .subscribe((result) => this.gotoUnitList());
  }

  gotoUnitList() {
    this.router.navigate(['/units']);
  }

  reset() {
    this.unitForm.reset();
  }
}
