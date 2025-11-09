import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBom } from './view-bom';

describe('ViewBom', () => {
  let component: ViewBom;
  let fixture: ComponentFixture<ViewBom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBom]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
