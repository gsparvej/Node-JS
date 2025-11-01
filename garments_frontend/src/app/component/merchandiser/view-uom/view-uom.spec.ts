import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUOM } from './view-uom';

describe('ViewUOM', () => {
  let component: ViewUOM;
  let fixture: ComponentFixture<ViewUOM>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUOM]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUOM);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
