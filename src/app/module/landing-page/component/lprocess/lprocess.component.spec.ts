import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LprocessComponent } from './lprocess.component';

describe('LprocessComponent', () => {
  let component: LprocessComponent;
  let fixture: ComponentFixture<LprocessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LprocessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LprocessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
