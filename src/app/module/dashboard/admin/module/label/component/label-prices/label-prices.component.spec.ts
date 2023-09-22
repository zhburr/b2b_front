import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelPricesComponent } from './label-prices.component';

describe('LabelPricesComponent', () => {
  let component: LabelPricesComponent;
  let fixture: ComponentFixture<LabelPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelPricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
