import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LserviceComponent } from './lservice.component';

describe('LserviceComponent', () => {
  let component: LserviceComponent;
  let fixture: ComponentFixture<LserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LserviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
