import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjstutoComponent } from './rxjstuto.component';

describe('RxjstutoComponent', () => {
  let component: RxjstutoComponent;
  let fixture: ComponentFixture<RxjstutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjstutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjstutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
