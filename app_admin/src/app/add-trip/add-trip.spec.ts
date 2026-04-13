import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrip } from './add-trip';

describe('AddTrip', () => {
  let component: AddTrip;
  let fixture: ComponentFixture<AddTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrip],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
