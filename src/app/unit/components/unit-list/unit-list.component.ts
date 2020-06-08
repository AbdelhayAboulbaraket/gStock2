import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Unit } from '../../model/unit';
import { UnitService } from '../../service/unit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
})
export class UnitListComponent implements OnInit {
  units: Unit[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['id', 'designation', 'description', 'actions'];
  dataSource = new MatTableDataSource<Unit>(this.units);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private unitService: UnitService, private route: Router) {}
  deleteUnit(id: string) {
    this.unitService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.unitService.findAll().subscribe(
          (data) => {
            this.units = data;
            this.dataSource = new MatTableDataSource<Unit>(this.units);
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Unit>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.unitService.findAll().subscribe(
      (data) => {
        this.units = data;
        this.dataSource = new MatTableDataSource<Unit>(this.units);
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Unit>(null);
      }
    );
  }
  goToUnitItem(code: string) {
    this.route.navigate(['/unit/' + code]);
  }
}
