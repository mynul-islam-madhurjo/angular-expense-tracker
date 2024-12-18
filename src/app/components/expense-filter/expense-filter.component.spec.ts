import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseFilterComponent } from './expense-filter.component';

describe('ExpenseFilterComponent', () => {
  let component: ExpenseFilterComponent;
  let fixture: ComponentFixture<ExpenseFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
