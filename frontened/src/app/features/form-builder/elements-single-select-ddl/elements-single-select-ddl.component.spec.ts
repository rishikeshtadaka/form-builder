import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsSingleSelectDdlComponent } from './elements-single-select-ddl.component';

describe('ElementsSingleSelectDdlComponent', () => {
  let component: ElementsSingleSelectDdlComponent;
  let fixture: ComponentFixture<ElementsSingleSelectDdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsSingleSelectDdlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementsSingleSelectDdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
