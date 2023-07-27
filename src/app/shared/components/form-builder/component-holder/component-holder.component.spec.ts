import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHolderComponent } from './component-holder.component';

describe('ComponentHolderComponent', () => {
  let component: ComponentHolderComponent;
  let fixture: ComponentFixture<ComponentHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentHolderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
