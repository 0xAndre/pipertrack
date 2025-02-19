import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildQueuingTimeComponent } from './build-queuing-time.component';

describe('BuildQueuingTimeComponent', () => {
  let component: BuildQueuingTimeComponent;
  let fixture: ComponentFixture<BuildQueuingTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuildQueuingTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildQueuingTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
