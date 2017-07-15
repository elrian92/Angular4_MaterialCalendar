import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogResult } from './calendar-dialog.component';

describe('CalendarDialogComponent', () => {
  let component: DialogResult;
  let fixture: ComponentFixture<DialogResult>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogResult ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
