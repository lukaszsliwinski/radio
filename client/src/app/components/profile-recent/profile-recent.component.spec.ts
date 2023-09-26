import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecentComponent } from './profile-recent.component';

describe('ProfileRecentComponent', () => {
  let component: ProfileRecentComponent;
  let fixture: ComponentFixture<ProfileRecentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileRecentComponent]
    });
    fixture = TestBed.createComponent(ProfileRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
