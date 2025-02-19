import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostCommitDeveloperComponent } from './most-commit-developer.component';

describe('MostCommitDeveloperComponent', () => {
  let component: MostCommitDeveloperComponent;
  let fixture: ComponentFixture<MostCommitDeveloperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostCommitDeveloperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostCommitDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
