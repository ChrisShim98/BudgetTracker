import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBudgetPromptComponent } from './select-budget-prompt.component';

describe('SelectBudgetPromptComponent', () => {
  let component: SelectBudgetPromptComponent;
  let fixture: ComponentFixture<SelectBudgetPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBudgetPromptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectBudgetPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
