import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityRulesConfigurationComponent } from './visibility-rules-configuration.component';

describe('VisibilityRulesConfigurationComponent', () => {
  let component: VisibilityRulesConfigurationComponent;
  let fixture: ComponentFixture<VisibilityRulesConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisibilityRulesConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisibilityRulesConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
