import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LteamComponent } from './lteam.component';

describe('LteamComponent', () => {
  let component: LteamComponent;
  let fixture: ComponentFixture<LteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LteamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
