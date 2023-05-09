import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboutComponent } from './labout.component';

describe('LaboutComponent', () => {
  let component: LaboutComponent;
  let fixture: ComponentFixture<LaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
