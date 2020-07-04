import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionFormDialogComponent } from './description-form-dialog.component';

describe('DescriptionFormDialogComponent', () => {
  let component: DescriptionFormDialogComponent;
  let fixture: ComponentFixture<DescriptionFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptionFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
