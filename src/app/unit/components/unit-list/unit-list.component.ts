import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Unit } from '../../model/unit';
import { UnitService } from '../../service/unit.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.css'],
})
export class UnitListComponent implements OnInit {
  role: string;
  units: Unit[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['id', 'designation', 'description', 'actions'];
  dataSource = new MatTableDataSource<Unit>(this.units);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private unitService: UnitService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.role = sessionStorage.getItem('role');
  }
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

  isUser() {
    if (this.role === 'User') {
      return true;
    }
    return false;
  }
  isAdmin() {
    if (this.role === 'Admin') {
      return true;
    }
    return false;
  }
  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'unité de mesure " + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUnit(result.data.codeSupp);
      }
    });
  }
}
