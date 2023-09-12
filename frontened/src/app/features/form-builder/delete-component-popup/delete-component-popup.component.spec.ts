import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponentPopupComponent } from './delete-component-popup.component';

describe('DeleteComponentPopupComponent', () => {
  let component: DeleteComponentPopupComponent;
  let fixture: ComponentFixture<DeleteComponentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteComponentPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteComponentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
