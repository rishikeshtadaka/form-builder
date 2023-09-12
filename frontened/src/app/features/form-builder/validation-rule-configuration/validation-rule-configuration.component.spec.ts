import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationRuleConfigurationComponent } from './validation-rule-configuration.component';

describe('ValidationRuleConfigurationComponent', () => {
  let component: ValidationRuleConfigurationComponent;
  let fixture: ComponentFixture<ValidationRuleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidationRuleConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidationRuleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
