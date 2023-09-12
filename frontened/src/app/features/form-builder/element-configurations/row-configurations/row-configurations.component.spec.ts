import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowConfigurationsComponent } from './row-configurations.component';

describe('RowConfigurationsComponent', () => {
  let component: RowConfigurationsComponent;
  let fixture: ComponentFixture<RowConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
