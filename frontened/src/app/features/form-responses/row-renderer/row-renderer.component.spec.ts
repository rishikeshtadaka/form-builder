import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowRendererComponent } from './row-renderer.component';

describe('RowRendererComponent', () => {
  let component: RowRendererComponent;
  let fixture: ComponentFixture<RowRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RowRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
