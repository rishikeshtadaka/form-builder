import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStyleConfigurationComponent } from './common-style-configuration.component';

describe('CommonStyleConfigurationComponent', () => {
  let component: CommonStyleConfigurationComponent;
  let fixture: ComponentFixture<CommonStyleConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStyleConfigurationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonStyleConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
