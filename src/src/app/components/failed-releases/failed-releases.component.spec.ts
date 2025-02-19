import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedReleasesComponent } from './failed-releases.component';

describe('FailedReleasesComponent', () => {
  let component: FailedReleasesComponent;
  let fixture: ComponentFixture<FailedReleasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FailedReleasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedReleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
