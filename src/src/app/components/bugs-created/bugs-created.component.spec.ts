import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugsCreatedComponent } from './bugs-created.component';

describe('BugsCreatedComponent', () => {
  let component: BugsCreatedComponent;
  let fixture: ComponentFixture<BugsCreatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BugsCreatedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BugsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
