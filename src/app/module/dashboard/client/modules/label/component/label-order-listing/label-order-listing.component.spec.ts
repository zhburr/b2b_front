import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelOrderListingComponent } from './label-order-listing.component';

describe('LabelOrderListingComponent', () => {
  let component: LabelOrderListingComponent;
  let fixture: ComponentFixture<LabelOrderListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelOrderListingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelOrderListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
