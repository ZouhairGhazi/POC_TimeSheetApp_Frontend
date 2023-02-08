import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimesComponent } from './user-times.component';

describe('UserTimesComponent', () => {
  let component: UserTimesComponent;
  let fixture: ComponentFixture<UserTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
