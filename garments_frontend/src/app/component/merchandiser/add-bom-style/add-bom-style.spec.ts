import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBomStyle } from './add-bom-style';

describe('AddBomStyle', () => {
  let component: AddBomStyle;
  let fixture: ComponentFixture<AddBomStyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBomStyle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBomStyle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
