import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemcomponent } from './view-itemcomponent';

describe('ViewItemcomponent', () => {
  let component: ViewItemcomponent;
  let fixture: ComponentFixture<ViewItemcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewItemcomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItemcomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
