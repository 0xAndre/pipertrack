import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildAveragetimeComponent } from './build-averagetime.component';

describe('BuildAveragetimeComponent', () => {
  let component: BuildAveragetimeComponent;
  let fixture: ComponentFixture<BuildAveragetimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildAveragetimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildAveragetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
