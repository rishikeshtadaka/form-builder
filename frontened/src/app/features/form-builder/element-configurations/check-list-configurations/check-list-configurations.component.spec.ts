import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListConfigurationsComponent } from './check-list-configurations.component';

describe('CheckListConfigurationsComponent', () => {
  let component: CheckListConfigurationsComponent;
  let fixture: ComponentFixture<CheckListConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckListConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
