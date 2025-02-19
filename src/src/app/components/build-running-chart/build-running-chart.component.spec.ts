import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildRunningChartComponent } from './build-running-chart.component';

describe('BuildRunningChartComponent', () => {
  let component: BuildRunningChartComponent;
  let fixture: ComponentFixture<BuildRunningChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildRunningChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildRunningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
