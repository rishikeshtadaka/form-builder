import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityRuleExpressionComponent } from './visibility-rule-expression.component';

describe('VisibilityRuleExpressionComponent', () => {
  let component: VisibilityRuleExpressionComponent;
  let fixture: ComponentFixture<VisibilityRuleExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityRuleExpressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibilityRuleExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
