import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartHouseComponent } from './smartHouse.component';

describe('SmartHouseComponent', () => {
  let component: SmartHouseComponent;
  let fixture: ComponentFixture<SmartHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
