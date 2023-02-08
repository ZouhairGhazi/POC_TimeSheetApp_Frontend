import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOwnTimesComponent } from './user-own-times.component';

describe('UserOwnTimesComponent', () => {
  let component: UserOwnTimesComponent;
  let fixture: ComponentFixture<UserOwnTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserOwnTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserOwnTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
