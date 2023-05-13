import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcontactComponent } from './lcontact.component';

describe('LcontactComponent', () => {
  let component: LcontactComponent;
  let fixture: ComponentFixture<LcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
