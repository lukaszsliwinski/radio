import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavouritesComponent } from './profile-favourites.component';

describe('ProfileFavouritesComponent', () => {
  let component: ProfileFavouritesComponent;
  let fixture: ComponentFixture<ProfileFavouritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileFavouritesComponent]
    });
    fixture = TestBed.createComponent(ProfileFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
