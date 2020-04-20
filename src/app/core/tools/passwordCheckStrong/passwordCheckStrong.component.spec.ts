import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCheckStrongComponent } from './passwordCheckStrong.component';

describe('SpinnerComponent', () => {
  let component: PasswordCheckStrongComponent;
  let fixture: ComponentFixture<PasswordCheckStrongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordCheckStrongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCheckStrongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
