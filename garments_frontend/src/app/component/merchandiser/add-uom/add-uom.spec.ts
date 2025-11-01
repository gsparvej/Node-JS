import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUOM } from './add-uom';

describe('AddUOM', () => {
  let component: AddUOM;
  let fixture: ComponentFixture<AddUOM>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUOM]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUOM);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
