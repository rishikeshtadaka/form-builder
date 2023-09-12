import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRuleExpressionComponent } from './validation-rule-expression.component';

describe('ValidationRuleExpressionComponent', () => {
  let component: ValidationRuleExpressionComponent;
  let fixture: ComponentFixture<ValidationRuleExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRuleExpressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationRuleExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
