import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementFormComponent } from './mouvement-form.component';

describe('MouvementFormComponent', () => {
  let component: MouvementFormComponent;
  let fixture: ComponentFixture<MouvementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
