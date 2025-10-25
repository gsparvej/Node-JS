import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHalfPO } from './view-half-po';

describe('ViewHalfPO', () => {
  let component: ViewHalfPO;
  let fixture: ComponentFixture<ViewHalfPO>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHalfPO]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHalfPO);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
