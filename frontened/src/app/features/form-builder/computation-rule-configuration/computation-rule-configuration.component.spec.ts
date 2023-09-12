import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputationRuleConfigurationComponent } from './computation-rule-configuration.component';

describe('ComputationRuleConfigurationComponent', () => {
  let component: ComputationRuleConfigurationComponent;
  let fixture: ComponentFixture<ComputationRuleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputationRuleConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputationRuleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
