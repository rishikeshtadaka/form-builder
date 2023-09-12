import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelConfigurationsComponent } from './label-configurations.component';

describe('LabelConfigurationsComponent', () => {
  let component: LabelConfigurationsComponent;
  let fixture: ComponentFixture<LabelConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
