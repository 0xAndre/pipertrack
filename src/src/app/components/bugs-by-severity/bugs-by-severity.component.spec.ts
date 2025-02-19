import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsBySeverityComponent } from './bugs-by-severity.component';

describe('BugsBySeverityComponent', () => {
  let component: BugsBySeverityComponent;
  let fixture: ComponentFixture<BugsBySeverityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugsBySeverityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugsBySeverityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
