import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHalfOrder } from './view-half-order';

describe('ViewHalfOrder', () => {
  let component: ViewHalfOrder;
  let fixture: ComponentFixture<ViewHalfOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHalfOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHalfOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
