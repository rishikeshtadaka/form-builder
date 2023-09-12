import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberConfigurationsComponent } from './number-configurations.component';

describe('NumberConfigurationsComponent', () => {
  let component: NumberConfigurationsComponent;
  let fixture: ComponentFixture<NumberConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
