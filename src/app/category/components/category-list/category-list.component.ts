import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
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
    private route: Router
  ) {}
  deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe(
      (data) => {
        console.log(data);
        this.categoryService.findAll().subscribe(
          (data) => {
            this.categories = data;
            this.dataSource = new MatTableDataSource<Category>(this.categories);
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
}
