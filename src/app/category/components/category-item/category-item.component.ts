import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../model/category';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
})
export class CategoryItemComponent implements OnInit {
  codeId: string;
  categoryForm: FormGroup;
  category: Category;
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
  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      designation: new FormControl('', Validators.required),
      description: new FormControl('', Validators.nullValidator),
    });
    this.codeId = this.route.snapshot.params['id'];
    this.categoryService.findCategory(this.codeId).subscribe(
      (data) => {
        this.category = data[0];
        console.log(this.category);
        this.designation.setValue(this.category.designation);
        this.description.setValue(this.category.description);
      },
      (error) => console.log('error')
    );
  }

  onSubmit() {
    this.category = this.categoryForm.value;
    this.categoryService
      .update(this.codeId, this.category)
      .subscribe((result) => this.gotoCurrencyList());
  }

  gotoCurrencyList() {
    this.router.navigate(['/categories']);
  }

  reset() {
    this.categoryForm.reset();
  }
}
