import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  category: Category;

  get id() {
    return this.categoryForm.get('id');
  }
  get designation() {
    return this.categoryForm.get('designation');
  }
  get description() {
    return this.categoryForm.get('description');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.category = new Category();
  }
  onSubmit() {
    this.category = this.categoryForm.value;
    this.categoryService
      .save(this.category)
      .subscribe((result) => this.gotoCategoryList());
  }

  gotoCategoryList() {
    this.router.navigate(['/categories']);
  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      designation: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
    });
  }
}
