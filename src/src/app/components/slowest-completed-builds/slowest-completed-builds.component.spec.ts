import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowestCompletedBuildsComponent } from './slowest-completed-builds.component';

describe('SlowestCompletedBuildsComponent', () => {
  let component: SlowestCompletedBuildsComponent;
  let fixture: ComponentFixture<SlowestCompletedBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlowestCompletedBuildsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlowestCompletedBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
