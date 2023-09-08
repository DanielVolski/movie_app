import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterMoviePage } from './register-movie.page';

describe('RegisterMoviePage', () => {
  let component: RegisterMoviePage;
  let fixture: ComponentFixture<RegisterMoviePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegisterMoviePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
