import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkHeaderComponent } from './fork-header.component';

describe('ForkHeaderComponent', () => {
  let component: ForkHeaderComponent;
  let fixture: ComponentFixture<ForkHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForkHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
