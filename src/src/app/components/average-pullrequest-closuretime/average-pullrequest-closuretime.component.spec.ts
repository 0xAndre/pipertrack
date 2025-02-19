import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AveragePullrequestClosuretimeComponent } from './average-pullrequest-closuretime.component';

describe('AveragePullrequestClosuretimeComponent', () => {
  let component: AveragePullrequestClosuretimeComponent;
  let fixture: ComponentFixture<AveragePullrequestClosuretimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AveragePullrequestClosuretimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AveragePullrequestClosuretimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
