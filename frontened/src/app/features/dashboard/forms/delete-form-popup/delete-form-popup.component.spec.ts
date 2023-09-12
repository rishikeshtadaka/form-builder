import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFormPopupComponent } from './delete-form-popup.component';

describe('DeleteFormPopupComponent', () => {
  let component: DeleteFormPopupComponent;
  let fixture: ComponentFixture<DeleteFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFormPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
