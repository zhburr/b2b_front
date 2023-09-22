import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelOrderComponent } from './label-order.component';

describe('LabelOrderComponent', () => {
  let component: LabelOrderComponent;
  let fixture: ComponentFixture<LabelOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
