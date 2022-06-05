import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkHomeComponent } from './fork-home.component';

describe('ForkHomeComponent', () => {
  let component: ForkHomeComponent;
  let fixture: ComponentFixture<ForkHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForkHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
