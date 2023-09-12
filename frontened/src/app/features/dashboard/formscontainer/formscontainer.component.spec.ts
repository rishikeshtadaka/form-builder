import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormscontainerComponent } from './formscontainer.component';

describe('FormscontainerComponent', () => {
  let component: FormscontainerComponent;
  let fixture: ComponentFixture<FormscontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormscontainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormscontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
