import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAreaConfigurationsComponent } from './text-area-configurations.component';

describe('TextAreaConfigurationsComponent', () => {
  let component: TextAreaConfigurationsComponent;
  let fixture: ComponentFixture<TextAreaConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextAreaConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAreaConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
