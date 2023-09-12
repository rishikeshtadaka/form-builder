import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionConfigurationsComponent } from './section-configurations.component';

describe('SectionConfigurationsComponent', () => {
  let component: SectionConfigurationsComponent;
  let fixture: ComponentFixture<SectionConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
