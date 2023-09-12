import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCollectionPopupComponent } from './delete-collection-popup.component';

describe('DeleteCollectionPopupComponent', () => {
  let component: DeleteCollectionPopupComponent;
  let fixture: ComponentFixture<DeleteCollectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCollectionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCollectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
