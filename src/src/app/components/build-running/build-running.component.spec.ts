import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildRunningComponent } from './build-running.component';

describe('BuildRunningComponent', () => {
  let component: BuildRunningComponent;
  let fixture: ComponentFixture<BuildRunningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildRunningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
