import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  role: string;
  categories: Category[];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['id', 'designation', 'description', 'actions'];
  dataSource = new MatTableDataSource<Category>(this.categories);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private categoryService: CategoryService,
    private route: Router,
    public dialog: MatDialog
  ) {
    this.role = sessionStorage.getItem('role');
  }
  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.categoryService.findAll().subscribe(
          (data) => {
            this.categories = data;
            this.dataSource = new MatTableDataSource<Category>(this.categories);
            this.dataSource.paginator = this.paginator;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Category>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit() {
    this.categoryService.findAll().subscribe(
      (data) => {
        this.categories = data;
        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.log('tcalma');
        this.dataSource = new MatTableDataSource<Category>(null);
      }
    );
  }
  goToCategoryItem(code: string) {
    this.route.navigate(['/category/' + code]);
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
        message: 'Voulez vous supprimer la catégorie ' + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCategory(result.data.codeSupp);
      }
    });
  }
}
