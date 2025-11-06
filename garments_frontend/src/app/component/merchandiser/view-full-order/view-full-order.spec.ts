import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFullOrder } from './view-full-order';

describe('ViewFullOrder', () => {
  let component: ViewFullOrder;
  let fixture: ComponentFixture<ViewFullOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFullOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFullOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
