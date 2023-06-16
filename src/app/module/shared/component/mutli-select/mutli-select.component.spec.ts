import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutliSelectComponent } from './mutli-select.component';

describe('MutliSelectComponent', () => {
  let component: MutliSelectComponent;
  let fixture: ComponentFixture<MutliSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutliSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutliSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
