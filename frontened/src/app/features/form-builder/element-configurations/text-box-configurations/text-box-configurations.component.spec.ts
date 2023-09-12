import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxConfigurationsComponent } from './text-box-configurations.component';

describe('TextBoxConfigurationsComponent', () => {
  let component: TextBoxConfigurationsComponent;
  let fixture: ComponentFixture<TextBoxConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextBoxConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextBoxConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
