import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: WebsiteContactComponent;
  let fixture: ComponentFixture<WebsiteContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
