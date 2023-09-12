import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioButtonConfigurationsComponent } from './radio-button-configurations.component';

describe('RadioButtonConfigurationsComponent', () => {
  let component: RadioButtonConfigurationsComponent;
  let fixture: ComponentFixture<RadioButtonConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioButtonConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioButtonConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
