import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostFailedBuildsComponent } from './most-failed-builds.component';

describe('MostFailedBuildsComponent', () => {
  let component: MostFailedBuildsComponent;
  let fixture: ComponentFixture<MostFailedBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostFailedBuildsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostFailedBuildsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
