import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVendor } from './view-vendor';

describe('ViewVendor', () => {
  let component: ViewVendor;
  let fixture: ComponentFixture<ViewVendor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewVendor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewVendor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
