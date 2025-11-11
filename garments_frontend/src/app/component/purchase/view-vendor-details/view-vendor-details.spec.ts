import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendorDetails } from './view-vendor-details';

describe('ViewVendorDetails', () => {
  let component: ViewVendorDetails;
  let fixture: ComponentFixture<ViewVendorDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVendorDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVendorDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
