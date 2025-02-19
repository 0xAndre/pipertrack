import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePullrequestsComponent } from './active-pullrequests.component';

describe('ActivePullrequestsComponent', () => {
  let component: ActivePullrequestsComponent;
  let fixture: ComponentFixture<ActivePullrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivePullrequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivePullrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
