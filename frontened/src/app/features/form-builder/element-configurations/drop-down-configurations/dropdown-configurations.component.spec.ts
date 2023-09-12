import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownConfigurationsComponent } from './dropdown-configurations.component';

describe('DropdownConfigurationsComponent', () => {
  let component: DropdownConfigurationsComponent;
  let fixture: ComponentFixture<DropdownConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
