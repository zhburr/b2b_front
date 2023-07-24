import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPostageComponent } from './order-postage.component';

describe('OrderPostageComponent', () => {
  let component: OrderPostageComponent;
  let fixture: ComponentFixture<OrderPostageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderPostageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPostageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
