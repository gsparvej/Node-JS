import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBomStyle } from './view-bom-style';

describe('ViewBomStyle', () => {
  let component: ViewBomStyle;
  let fixture: ComponentFixture<ViewBomStyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBomStyle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBomStyle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
