import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPrenotapastiComponent } from './header-prenotapasti.component';

describe('HeaderPrenotapastiComponent', () => {
  let component: HeaderPrenotapastiComponent;
  let fixture: ComponentFixture<HeaderPrenotapastiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPrenotapastiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPrenotapastiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
